const express = require("express");
const { query } = require("../db/pool");
const {
  normalizeOptionalString,
  parseIsoDate,
  parseLimitParam,
  parseOptionalUuidParam,
  parseRequiredUuidParam,
} = require("../utils/validation");
const { createFilterBuilder } = require("../utils/query-builder");

const router = express.Router();

const ALLOWED_STATUSES = new Set(["present", "absent", "late", "excused"]);

function formatAttendanceLog(row) {
  return {
    id: row.id,
    calendarEventId: row.calendar_event_id,
    memberId: row.member_id,
    status: row.status,
    recordedAt: row.recorded_at?.toISOString?.() ?? row.recorded_at,
    note: row.note,
    createdAt: row.created_at?.toISOString?.() ?? row.created_at,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { memberId, calendarEventId, status: statusFilter, limit: limitParam } = req.query;

    const filterBuilder = createFilterBuilder();

    const memberIdResult = parseOptionalUuidParam(memberId, "memberId");
    if (!memberIdResult.ok) {
      return res.status(400).json({ error: memberIdResult.error });
    }
    if (memberIdResult.value !== undefined) {
      filterBuilder.addEquality("member_id", memberIdResult.value);
    }

    const calendarEventIdResult = parseOptionalUuidParam(
      calendarEventId,
      "calendarEventId",
    );
    if (!calendarEventIdResult.ok) {
      return res.status(400).json({ error: calendarEventIdResult.error });
    }
    if (calendarEventIdResult.value !== undefined) {
      filterBuilder.addEquality(
        "calendar_event_id",
        calendarEventIdResult.value,
      );
    }

    if (statusFilter !== undefined) {
      if (!ALLOWED_STATUSES.has(statusFilter)) {
        return res.status(400).json({ error: "status must be one of present, absent, late, or excused." });
      }

      filterBuilder.addEquality("status", statusFilter);
    }

    const limit = parseLimitParam(limitParam);

    const whereClause = filterBuilder.buildWhereClause();

    const limitPlaceholder = filterBuilder.values.length + 1;
    const values = filterBuilder.buildValues(limit);

    const result = await query(
      `SELECT id, calendar_event_id, member_id, status, recorded_at, note, created_at
         FROM training_attendance_logs
         ${whereClause}
         ORDER BY recorded_at DESC, created_at DESC
         LIMIT $${limitPlaceholder}`,
      values,
    );

    res.json({ attendanceLogs: result.rows.map(formatAttendanceLog) });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { calendarEventId, memberId, status, recordedAt, note } = req.body ?? {};

    const calendarEventIdResult = parseRequiredUuidParam(
      calendarEventId,
      "calendarEventId",
    );
    if (!calendarEventIdResult.ok) {
      return res.status(400).json({ error: calendarEventIdResult.error });
    }

    const memberIdResult = parseRequiredUuidParam(memberId, "memberId");
    if (!memberIdResult.ok) {
      return res.status(400).json({ error: memberIdResult.error });
    }

    if (!status || !ALLOWED_STATUSES.has(status)) {
      return res
        .status(400)
        .json({ error: "status must be one of present, absent, late, or excused." });
    }

    const normalizedNote = normalizeOptionalString(note);
    const normalizedRecordedAt = parseIsoDate(recordedAt, "recordedAt");

    const result = await query(
      `INSERT INTO training_attendance_logs (calendar_event_id, member_id, status, recorded_at, note)
       VALUES ($1, $2, $3, COALESCE($4::timestamptz, NOW()), $5)
       RETURNING id, calendar_event_id, member_id, status, recorded_at, note, created_at`,
      [
        calendarEventIdResult.value,
        memberIdResult.value,
        status,
        normalizedRecordedAt ?? null,
        normalizedNote ?? null,
      ],
    );

    res.status(201).json({ attendanceLog: formatAttendanceLog(result.rows[0]) });
  } catch (error) {
    if (error.code === "23503") {
      if (error.detail && error.detail.includes("calendar_event_id")) {
        return res
          .status(400)
          .json({ error: "calendarEventId does not reference an existing calendar event." });
      }

      if (error.detail && error.detail.includes("member_id")) {
        return res.status(400).json({ error: "memberId does not reference an existing member." });
      }
    }

    if (error.code === "23505") {
      return res.status(409).json({ error: "Attendance has already been recorded for this member and event." });
    }

    next(error);
  }
});

module.exports = router;
