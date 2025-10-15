const express = require("express");
const { query } = require("../db/pool");

const router = express.Router();

const ALLOWED_STATUSES = new Set(["present", "absent", "late", "excused"]);

function isValidUuid(value) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

function normalizeOptionalString(value) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function parseIsoDate(value, fieldName) {
  if (value === undefined) {
    return undefined;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    const error = new Error(`${fieldName} must be a valid ISO 8601 date-time string.`);
    error.status = 400;
    error.expose = true;
    throw error;
  }

  return parsed.toISOString();
}

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

    const filters = [];
    const values = [];

    if (memberId !== undefined) {
      if (!isValidUuid(memberId)) {
        return res.status(400).json({ error: "memberId must be a valid UUID." });
      }

      values.push(memberId);
      filters.push(`member_id = $${values.length}`);
    }

    if (calendarEventId !== undefined) {
      if (!isValidUuid(calendarEventId)) {
        return res.status(400).json({ error: "calendarEventId must be a valid UUID." });
      }

      values.push(calendarEventId);
      filters.push(`calendar_event_id = $${values.length}`);
    }

    if (statusFilter !== undefined) {
      if (!ALLOWED_STATUSES.has(statusFilter)) {
        return res.status(400).json({ error: "status must be one of present, absent, late, or excused." });
      }

      values.push(statusFilter);
      filters.push(`status = $${values.length}`);
    }

    let limit = 100;
    if (limitParam !== undefined) {
      const parsedLimit = Number(limitParam);
      if (!Number.isInteger(parsedLimit) || parsedLimit <= 0 || parsedLimit > 500) {
        return res.status(400).json({ error: "limit must be an integer between 1 and 500." });
      }
      limit = parsedLimit;
    }

    const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    values.push(limit);

    const result = await query(
      `SELECT id, calendar_event_id, member_id, status, recorded_at, note, created_at
         FROM training_attendance_logs
         ${whereClause}
         ORDER BY recorded_at DESC, created_at DESC
         LIMIT $${values.length}`,
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

    if (!calendarEventId || !isValidUuid(calendarEventId)) {
      return res
        .status(400)
        .json({ error: "calendarEventId is required and must be a valid UUID." });
    }

    if (!memberId || !isValidUuid(memberId)) {
      return res.status(400).json({ error: "memberId is required and must be a valid UUID." });
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
        calendarEventId,
        memberId,
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
