const express = require("express");
const { query, pool } = require("../db/pool");

const router = express.Router();

const ALLOWED_CATEGORIES = new Set(["training", "competition"]);
const ALLOWED_LEVELS = new Set(["regional", "national", "international"]);
const ALLOWED_EVENT_TYPES = new Set([
  "competition",
  "entrainment",
  "meet",
  "other",
]);

function isValidUuid(value) {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

function toIsoString(value) {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return value ?? null;
}

function parseMembers(value) {
  if (!value) {
    return [];
  }

  const parsed = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? (() => {
          try {
            const result = JSON.parse(value);
            return Array.isArray(result) ? result : [];
          } catch (error) {
            return [];
          }
        })()
      : [];

  return parsed
    .map((member) => {
      if (!member || typeof member !== "object") {
        return null;
      }

      const { id, fullName, email, membershipId } = member;

      if (!isValidUuid(id)) {
        return null;
      }

      return {
        id,
        fullName: typeof fullName === "string" ? fullName : null,
        email: typeof email === "string" ? email : null,
        membershipId: typeof membershipId === "string" ? membershipId : null,
      };
    })
    .filter(Boolean);
}

function formatCalendarEvent(row) {
  const base = {
    id: row.id,
    category: row.category,
    eventType: row.event_type,
    titleKey: row.title_key,
    locationKey: row.location_key,
    start: toIsoString(row.start_time),
    end: toIsoString(row.end_time),
    createdAt: toIsoString(row.created_at),
    updatedAt: toIsoString(row.updated_at),
    members: parseMembers(row.members),
  };

  if (row.category === "training") {
    return {
      ...base,
      coachKey: row.coach_key,
    };
  }

  return {
    ...base,
    level: row.level,
    checkIn: toIsoString(row.check_in),
  };
}

function getCalendarEventRowById(id, executor = query) {
  return executor(
    `SELECT
        ce.id,
        ce.category,
        ce.event_type,
        ce.title_key,
        ce.location_key,
        ce.start_time,
        ce.end_time,
        ce.created_at,
        ce.updated_at,
        ted.coach_key,
        ced.level,
        ced.check_in,
        COALESCE(
          (
            SELECT jsonb_agg(
              jsonb_build_object(
                'id', m.id,
                'fullName', m.full_name,
                'email', m.email,
                'membershipId', m.membership_id
              )
              ORDER BY m.full_name
            )
            FROM calendar_event_members cem
            JOIN members m ON m.id = cem.member_id
            WHERE cem.calendar_event_id = ce.id
          ),
          '[]'::jsonb
        ) AS members
      FROM calendar_events ce
      LEFT JOIN training_event_details ted ON ted.calendar_event_id = ce.id
      LEFT JOIN competition_event_details ced ON ced.calendar_event_id = ce.id
      WHERE ce.id = $1`,
    [id],
  ).then((result) => result.rows[0] ?? null);
}

async function getCalendarEventById(id, executor = query) {
  const row = await getCalendarEventRowById(id, executor);
  return row ? formatCalendarEvent(row) : null;
}

router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT
         ce.id,
         ce.category,
         ce.event_type,
         ce.title_key,
         ce.location_key,
         ce.start_time,
         ce.end_time,
         ce.created_at,
         ce.updated_at,
         ted.coach_key,
         ced.level,
         ced.check_in,
         COALESCE(
           (
             SELECT jsonb_agg(
               jsonb_build_object(
                 'id', m.id,
                 'fullName', m.full_name,
                 'email', m.email,
                 'membershipId', m.membership_id
               )
               ORDER BY m.full_name
             )
             FROM calendar_event_members cem
             JOIN members m ON m.id = cem.member_id
             WHERE cem.calendar_event_id = ce.id
           ),
           '[]'::jsonb
         ) AS members
       FROM calendar_events ce
       LEFT JOIN training_event_details ted ON ted.calendar_event_id = ce.id
       LEFT JOIN competition_event_details ced ON ced.calendar_event_id = ce.id
       ORDER BY ce.start_time ASC, ce.created_at DESC`,
    );

    res.json({ events: result.rows.map(formatCalendarEvent) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid calendar event id." });
  }

  try {
    const event = await getCalendarEventById(id);

    if (!event) {
      return res.status(404).json({ error: "Calendar event not found." });
    }

    res.json({ event });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    category,
    eventType,
    titleKey,
    locationKey,
    start,
    end,
    coachKey,
    level,
    checkIn,
    members,
  } = req.body ?? {};

  const normalizedCategory = typeof category === "string" ? category.trim().toLowerCase() : "";
  const normalizedEventType =
    typeof eventType === "string" ? eventType.trim().toLowerCase() : "";
  const normalizedTitleKey = typeof titleKey === "string" ? titleKey.trim() : "";
  const normalizedLocationKey = typeof locationKey === "string" ? locationKey.trim() : "";

  if (!ALLOWED_CATEGORIES.has(normalizedCategory)) {
    return res.status(400).json({ error: "Category must be training or competition." });
  }

  if (!ALLOWED_EVENT_TYPES.has(normalizedEventType)) {
    return res.status(400).json({ error: "Invalid event type provided." });
  }

  if (!normalizedTitleKey || !normalizedLocationKey) {
    return res
      .status(400)
      .json({ error: "Title key and location key are required." });
  }

  const startDate = new Date(start ?? "");
  const endDate = new Date(end ?? "");

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return res.status(400).json({ error: "Valid start and end times are required." });
  }

  if (endDate.getTime() <= startDate.getTime()) {
    return res
      .status(400)
      .json({ error: "End time must be after the start time." });
  }

  let memberIds = [];

  if (members !== undefined) {
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "Members must be an array of UUID strings." });
    }

    const normalizedMembers = [];

    for (const memberId of members) {
      if (typeof memberId !== "string") {
        return res.status(400).json({ error: "Member IDs must be UUID strings." });
      }

      const trimmed = memberId.trim();

      if (!isValidUuid(trimmed)) {
        return res.status(400).json({ error: "One or more member IDs are invalid." });
      }

      normalizedMembers.push(trimmed);
    }

    memberIds = [...new Set(normalizedMembers)];
  }

  if (memberIds.length > 0) {
    const memberCheck = await query(
      `SELECT id FROM members WHERE id = ANY($1::uuid[])`,
      [memberIds],
    );

    if (memberCheck.rowCount !== memberIds.length) {
      return res.status(400).json({ error: "One or more member IDs do not exist." });
    }
  }

  let normalizedCoachKey = null;
  let normalizedLevel = null;
  let checkInDate = null;

  if (normalizedCategory === "training") {
    normalizedCoachKey = typeof coachKey === "string" ? coachKey.trim() : "";

    if (!normalizedCoachKey) {
      return res
        .status(400)
        .json({ error: "Coach key is required for training events." });
    }
  } else {
    normalizedLevel = typeof level === "string" ? level.trim().toLowerCase() : "";
    checkInDate = new Date(checkIn ?? "");

    if (!ALLOWED_LEVELS.has(normalizedLevel)) {
      return res.status(400).json({ error: "Invalid competition level." });
    }

    if (Number.isNaN(checkInDate.getTime())) {
      return res
        .status(400)
        .json({ error: "A valid check-in time is required for competitions." });
    }
  }

  const client = await pool.connect();
  let transactionStarted = false;

  try {
    await client.query("BEGIN");
    transactionStarted = true;

    const baseResult = await client.query(
      `INSERT INTO calendar_events (category, event_type, title_key, location_key, start_time, end_time)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [
        normalizedCategory,
        normalizedEventType,
        normalizedTitleKey,
        normalizedLocationKey,
        startDate.toISOString(),
        endDate.toISOString(),
      ],
    );

    const eventId = baseResult.rows[0].id;

    if (normalizedCategory === "training") {
      await client.query(
        `INSERT INTO training_event_details (calendar_event_id, coach_key)
         VALUES ($1, $2)`,
        [eventId, normalizedCoachKey],
      );
    } else {
      await client.query(
        `INSERT INTO competition_event_details (calendar_event_id, level, check_in)
         VALUES ($1, $2, $3)`,
        [eventId, normalizedLevel, checkInDate.toISOString()],
      );
    }

    if (memberIds.length > 0) {
      await client.query(
        `INSERT INTO calendar_event_members (calendar_event_id, member_id)
         SELECT $1, member_ids.member_id
         FROM UNNEST($2::uuid[]) AS member_ids(member_id)`,
        [eventId, memberIds],
      );
    }

    await client.query("COMMIT");
    transactionStarted = false;

    const event = await getCalendarEventById(eventId);
    res.status(201).json({ event });
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }

    next(error);
  } finally {
    client.release();
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid calendar event id." });
  }

  let existingRow;

  try {
    existingRow = await getCalendarEventRowById(id);
  } catch (error) {
    next(error);
    return;
  }

  if (!existingRow) {
    return res.status(404).json({ error: "Calendar event not found." });
  }

  const {
    category,
    eventType,
    titleKey,
    locationKey,
    start,
    end,
    coachKey,
    level,
    checkIn,
    members,
  } = req.body ?? {};

  const updates = [];
  const values = [];

  let nextCategory = existingRow.category;

  if (typeof category === "string") {
    const normalized = category.trim().toLowerCase();

    if (!ALLOWED_CATEGORIES.has(normalized)) {
      return res.status(400).json({ error: "Category must be training or competition." });
    }

    if (normalized !== existingRow.category) {
      nextCategory = normalized;
      values.push(normalized);
      updates.push(`category = $${values.length}`);
    }
  }

  if (typeof eventType === "string") {
    const normalized = eventType.trim().toLowerCase();

    if (!ALLOWED_EVENT_TYPES.has(normalized)) {
      return res.status(400).json({ error: "Invalid event type provided." });
    }

    if (normalized !== existingRow.event_type) {
      values.push(normalized);
      updates.push(`event_type = $${values.length}`);
    }
  }

  if (typeof titleKey === "string") {
    const normalized = titleKey.trim();

    if (!normalized) {
      return res.status(400).json({ error: "Title key cannot be empty." });
    }

    values.push(normalized);
    updates.push(`title_key = $${values.length}`);
  }

  if (typeof locationKey === "string") {
    const normalized = locationKey.trim();

    if (!normalized) {
      return res.status(400).json({ error: "Location key cannot be empty." });
    }

    values.push(normalized);
    updates.push(`location_key = $${values.length}`);
  }

  let startDate = null;
  let endDate = null;

  if (start !== undefined) {
    startDate = new Date(start);

    if (Number.isNaN(startDate.getTime())) {
      return res.status(400).json({ error: "Start time must be a valid date." });
    }

    values.push(startDate.toISOString());
    updates.push(`start_time = $${values.length}`);
  }

  if (end !== undefined) {
    endDate = new Date(end);

    if (Number.isNaN(endDate.getTime())) {
      return res.status(400).json({ error: "End time must be a valid date." });
    }

    values.push(endDate.toISOString());
    updates.push(`end_time = $${values.length}`);
  }

  const effectiveStart = startDate ?? existingRow.start_time;
  const effectiveEnd = endDate ?? existingRow.end_time;

  if (
    effectiveStart instanceof Date &&
    effectiveEnd instanceof Date &&
    effectiveEnd.getTime() <= effectiveStart.getTime()
  ) {
    return res
      .status(400)
      .json({ error: "End time must be after the start time." });
  }

  let nextCoachKey = existingRow.coach_key;
  let nextLevel = existingRow.level;
  let nextCheckIn = existingRow.check_in;
  let normalizedMemberIds = null;

  if (members !== undefined) {
    if (!Array.isArray(members)) {
      return res.status(400).json({ error: "Members must be an array of UUID strings." });
    }

    const collected = [];

    for (const memberId of members) {
      if (typeof memberId !== "string") {
        return res.status(400).json({ error: "Member IDs must be UUID strings." });
      }

      const trimmed = memberId.trim();

      if (!isValidUuid(trimmed)) {
        return res.status(400).json({ error: "One or more member IDs are invalid." });
      }

      collected.push(trimmed);
    }

    normalizedMemberIds = [...new Set(collected)];

    if (normalizedMemberIds.length > 0) {
      const memberCheck = await query(
        `SELECT id FROM members WHERE id = ANY($1::uuid[])`,
        [normalizedMemberIds],
      );

      if (memberCheck.rowCount !== normalizedMemberIds.length) {
        return res.status(400).json({ error: "One or more member IDs do not exist." });
      }
    }
  }

  if (nextCategory === "training") {
    if (coachKey !== undefined) {
      const normalized = typeof coachKey === "string" ? coachKey.trim() : "";

      if (!normalized) {
        return res
          .status(400)
          .json({ error: "Coach key cannot be empty for training events." });
      }

      nextCoachKey = normalized;
    }

    if (existingRow.category !== "training") {
      const normalized = typeof coachKey === "string" ? coachKey.trim() : "";

      if (!normalized) {
        return res
          .status(400)
          .json({ error: "Coach key is required when changing to training." });
      }

      nextCoachKey = normalized;
    }

    if (!nextCoachKey) {
      return res
        .status(400)
        .json({ error: "Coach key is required for training events." });
    }
  } else {
    if (level !== undefined) {
      const normalized = typeof level === "string" ? level.trim().toLowerCase() : "";

      if (!ALLOWED_LEVELS.has(normalized)) {
        return res.status(400).json({ error: "Invalid competition level." });
      }

      nextLevel = normalized;
    }

    if (checkIn !== undefined) {
      const parsed = new Date(checkIn);

      if (Number.isNaN(parsed.getTime())) {
        return res
          .status(400)
          .json({ error: "Check-in time must be a valid date." });
      }

      nextCheckIn = parsed;
    }

    if (existingRow.category !== "competition") {
      const normalizedLevel =
        typeof level === "string" ? level.trim().toLowerCase() : "";
      const parsedCheckIn = new Date(checkIn ?? "");

      if (!ALLOWED_LEVELS.has(normalizedLevel)) {
        return res
          .status(400)
          .json({ error: "Level is required when changing to competition." });
      }

      if (Number.isNaN(parsedCheckIn.getTime())) {
        return res
          .status(400)
          .json({ error: "Check-in time is required when changing to competition." });
      }

      nextLevel = normalizedLevel;
      nextCheckIn = parsedCheckIn;
    }

    if (!nextLevel || !ALLOWED_LEVELS.has(nextLevel)) {
      return res.status(400).json({ error: "Invalid competition level." });
    }

    if (!(nextCheckIn instanceof Date) || Number.isNaN(nextCheckIn.getTime())) {
      return res
        .status(400)
        .json({ error: "A valid check-in time is required for competitions." });
    }
  }

  const client = await pool.connect();
  let transactionStarted = false;

  try {
    await client.query("BEGIN");
    transactionStarted = true;

    const updateFragments = updates.length > 0 ? [...updates] : [];
    updateFragments.push("updated_at = NOW()");

    await client.query(
      `UPDATE calendar_events
       SET ${updateFragments.join(", ")}
       WHERE id = $${values.length + 1}`,
      [...values, id],
    );

    if (nextCategory === "training") {
      if (existingRow.category === "training") {
        await client.query(
          `UPDATE training_event_details
           SET coach_key = $1
           WHERE calendar_event_id = $2`,
          [nextCoachKey, id],
        );
      } else {
        await client.query(
          `DELETE FROM competition_event_details
           WHERE calendar_event_id = $1`,
          [id],
        );

        await client.query(
          `INSERT INTO training_event_details (calendar_event_id, coach_key)
           VALUES ($1, $2)`,
          [id, nextCoachKey],
        );
      }
    } else if (nextCategory === "competition") {
      if (existingRow.category === "competition") {
        await client.query(
          `UPDATE competition_event_details
           SET level = $1, check_in = $2
           WHERE calendar_event_id = $3`,
          [nextLevel, nextCheckIn.toISOString(), id],
        );
      } else {
        await client.query(
          `DELETE FROM training_event_details
           WHERE calendar_event_id = $1`,
          [id],
        );

        await client.query(
          `INSERT INTO competition_event_details (calendar_event_id, level, check_in)
           VALUES ($1, $2, $3)`,
          [id, nextLevel, nextCheckIn.toISOString()],
        );
      }
    }

    if (normalizedMemberIds !== null) {
      await client.query(
        `DELETE FROM calendar_event_members WHERE calendar_event_id = $1`,
        [id],
      );

      if (normalizedMemberIds.length > 0) {
        await client.query(
          `INSERT INTO calendar_event_members (calendar_event_id, member_id)
           SELECT $1, member_ids.member_id
           FROM UNNEST($2::uuid[]) AS member_ids(member_id)`,
          [id, normalizedMemberIds],
        );
      }
    }

    await client.query("COMMIT");
    transactionStarted = false;

    const event = await getCalendarEventById(id);
    res.json({ event });
  } catch (error) {
    if (transactionStarted) {
      await client.query("ROLLBACK");
    }

    next(error);
  } finally {
    client.release();
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid calendar event id." });
  }

  try {
    const result = await query(
      `DELETE FROM calendar_events
       WHERE id = $1`,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Calendar event not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
