const express = require("express");
const { query } = require("../db/pool");
const {
  isValidUuid,
  normalizeOptionalString,
  parseIsoDate,
  parseLimitParam,
} = require("../utils/validation");
const { createFilterBuilder } = require("../utils/query-builder");

const router = express.Router();

function formatAccessLog(row) {
  return {
    id: row.id,
    memberId: row.member_id,
    accessedAt: row.accessed_at?.toISOString?.() ?? row.accessed_at,
    accessPoint: row.access_point,
    note: row.note,
    createdAt: row.created_at?.toISOString?.() ?? row.created_at,
  };
}

router.get("/", async (req, res, next) => {
  try {
    const { memberId, limit: limitParam } = req.query;

    const filterBuilder = createFilterBuilder();

    if (memberId !== undefined) {
      if (!isValidUuid(memberId)) {
        return res
          .status(400)
          .json({ error: "memberId must be a valid UUID." });
      }

      filterBuilder.addEquality("member_id", memberId);
    }

    const limit = parseLimitParam(limitParam);

    const whereClause = filterBuilder.buildWhereClause();

    const limitPlaceholder = filterBuilder.values.length + 1;
    const values = filterBuilder.buildValues(limit);

    const result = await query(
      `SELECT id, member_id, accessed_at, access_point, note, created_at
         FROM member_access_logs
         ${whereClause}
         ORDER BY accessed_at DESC, created_at DESC
         LIMIT $${limitPlaceholder}`,
      values,
    );

    res.json({ accessLogs: result.rows.map(formatAccessLog) });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { memberId, accessedAt, accessPoint, note } = req.body ?? {};

    if (!memberId || !isValidUuid(memberId)) {
      return res
        .status(400)
        .json({ error: "memberId is required and must be a valid UUID." });
    }

    const normalizedAccessPoint = normalizeOptionalString(accessPoint);
    const normalizedNote = normalizeOptionalString(note);

    const normalizedAccessedAt = parseIsoDate(accessedAt, "accessedAt");

    const result = await query(
      `INSERT INTO member_access_logs (member_id, accessed_at, access_point, note)
       VALUES ($1, COALESCE($2::timestamptz, NOW()), $3, $4)
       RETURNING id, member_id, accessed_at, access_point, note, created_at`,
      [
        memberId,
        normalizedAccessedAt ?? null,
        normalizedAccessPoint ?? null,
        normalizedNote ?? null,
      ],
    );

    res.status(201).json({ accessLog: formatAccessLog(result.rows[0]) });
  } catch (error) {
    if (error.code === "23503") {
      return res
        .status(400)
        .json({ error: "memberId does not reference an existing member." });
    }

    next(error);
  }
});

module.exports = router;
