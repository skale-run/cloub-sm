const express = require("express");
const bcrypt = require("bcryptjs");
const { query } = require("../db/pool");
const { authenticate } = require("../middleware/authenticate");
const { createSession, signSessionToken } = require("../services/auth");
const { isValidUuid, normalizeOptionalString } = require("../utils/validation");

const router = express.Router();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function formatMember(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    squad: row.squad,
    role: row.role,
    emergencyContact: row.emergency_contact,
    membershipId: row.membership_id,
    profilePhotoUrl: row.profile_photo_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function parseIntegerParam(value, { name, min, max }) {
  if (value === undefined || value === null || value === "") {
    return { ok: true, value: undefined };
  }

  const normalized = typeof value === "string" ? value.trim() : value;
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) {
    return { ok: false, error: `${name} must be an integer.` };
  }

  if (typeof min === "number" && parsed < min) {
    return {
      ok: false,
      error: `${name} must be greater than or equal to ${min}.`,
    };
  }

  if (typeof max === "number" && parsed > max) {
    return {
      ok: false,
      error: `${name} must be less than or equal to ${max}.`,
    };
  }

  return { ok: true, value: parsed };
}

router.get("/", authenticate, async (req, res, next) => {
  const search = normalizeOptionalString(req.query.search);
  const squad = normalizeOptionalString(req.query.squad);
  const role = normalizeOptionalString(req.query.role);

  const limitResult = parseIntegerParam(req.query.limit, {
    name: "limit",
    min: 1,
    max: 100,
  });

  if (!limitResult.ok) {
    return res.status(400).json({ error: limitResult.error });
  }

  const offsetResult = parseIntegerParam(req.query.offset, {
    name: "offset",
    min: 0,
  });

  if (!offsetResult.ok) {
    return res.status(400).json({ error: offsetResult.error });
  }

  const filters = [];
  const filterValues = [];

  if (search) {
    filterValues.push(`%${search}%`);
    const placeholder = `$${filterValues.length}`;
    filters.push(
      `(full_name ILIKE ${placeholder} OR email ILIKE ${placeholder} OR membership_id ILIKE ${placeholder})`,
    );
  }

  if (squad) {
    filterValues.push(squad.toLowerCase());
    filters.push(`LOWER(squad) = $${filterValues.length}`);
  }

  if (role) {
    filterValues.push(role.toLowerCase());
    filters.push(`LOWER(role) = $${filterValues.length}`);
  }

  const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
  const baseQuery = `FROM members ${whereClause}`;

  try {
    const totalResult = await query(
      `SELECT COUNT(*) AS total ${baseQuery}`,
      filterValues,
    );

    const dataValues = [...filterValues];
    let dataQuery = `SELECT id, full_name, email, role, squad, emergency_contact, membership_id, profile_photo_url, created_at, updated_at ${baseQuery} ORDER BY created_at DESC, id DESC`;

    if (limitResult.value !== undefined) {
      dataValues.push(limitResult.value);
      dataQuery += ` LIMIT $${dataValues.length}`;
    }

    const effectiveOffset =
      offsetResult.value !== undefined
        ? offsetResult.value
        : limitResult.value !== undefined
          ? 0
          : undefined;

    if (effectiveOffset !== undefined) {
      dataValues.push(effectiveOffset);
      dataQuery += ` OFFSET $${dataValues.length}`;
    }

    const result = await query(dataQuery, dataValues);

    const response = {
      members: result.rows.map(formatMember),
      meta: {
        total: Number(totalResult.rows[0].total ?? 0),
        count: result.rowCount,
      },
    };

    if (limitResult.value !== undefined || effectiveOffset !== undefined) {
      response.meta.limit = limitResult.value ?? null;
      response.meta.offset = effectiveOffset ?? 0;
    }

    if (search || squad || role) {
      response.meta.filters = {};

      if (search) {
        response.meta.filters.search = search;
      }

      if (squad) {
        response.meta.filters.squad = squad;
      }

      if (role) {
        response.meta.filters.role = role;
      }
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const {
    fullName,
    email,
    password,
    role,
    squad,
    emergencyContact,
    membershipId,
    profilePhotoUrl,
  } = req.body ?? {};

  if (!fullName || !email || !password || !membershipId) {
    return res
      .status(400)
      .json({
        error: "Full name, email, password, and membership ID are required.",
      });
  }

  const normalizedFullName = fullName.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedRole = typeof role === "string" ? role.trim() : "";
  const normalizedSquad = typeof squad === "string" ? squad.trim() : "";
  const normalizedEmergencyContact =
    typeof emergencyContact === "string" ? emergencyContact.trim() : "";
  const normalizedMembershipId = membershipId.trim();
  const normalizedProfilePhotoUrl =
    typeof profilePhotoUrl === "string" ? profilePhotoUrl.trim() : "";

  if (!normalizedFullName) {
    return res.status(400).json({ error: "Full name is required." });
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return res
      .status(400)
      .json({ error: "A valid email address is required." });
  }

  if (!normalizedMembershipId) {
    return res.status(400).json({ error: "Membership ID is required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO members (full_name, email, password_hash, role, squad, emergency_contact, membership_id, profile_photo_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING id, full_name, email, role, squad, emergency_contact, membership_id, profile_photo_url, created_at, updated_at`,
      [
        normalizedFullName,
        normalizedEmail,
        passwordHash,
        normalizedRole || null,
        normalizedSquad || null,
        normalizedEmergencyContact || null,
        normalizedMembershipId,
        normalizedProfilePhotoUrl || null,
      ],
    );

    res.status(201).json({ member: formatMember(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") {
      const message =
        error.constraint === "members_membership_id_key"
          ? "A member with this membership ID already exists."
          : "A member with this email already exists.";

      res.status(409).json({ error: message });
      return;
    }

    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const result = await query(
      `SELECT id, full_name, email, password_hash, role, squad, emergency_contact, membership_id, profile_photo_url, created_at, updated_at
       FROM members
       WHERE LOWER(email) = LOWER($1)`,
      [email.trim()],
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const member = result.rows[0];
    const isMatch = await bcrypt.compare(password, member.password_hash);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const session = await createSession(member.id);
    const token = signSessionToken({
      sessionId: session.id,
      memberId: member.id,
    });

    res.json({
      member: formatMember(member),
      token,
      session: {
        id: session.id,
        expiresAt: new Date(session.expires_at).toISOString(),
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
  }

  if (req.auth?.memberId !== id) {
    return res
      .status(403)
      .json({ error: "You do not have access to this member." });
  }

  try {
    const result = await query(
      `SELECT id, full_name, email, role, squad, emergency_contact, membership_id, profile_photo_url, created_at, updated_at
       FROM members
       WHERE id = $1`,
      [id],
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Member not found." });
    }

    res.json({ member: formatMember(result.rows[0]) });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;
  const {
    fullName,
    email,
    password,
    role,
    squad,
    emergencyContact,
    membershipId,
    profilePhotoUrl,
  } = req.body ?? {};

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
  }

  if (req.auth?.memberId !== id) {
    return res
      .status(403)
      .json({ error: "You do not have access to update this member." });
  }

  const updates = [];
  const values = [];

  if (typeof fullName === "string" && fullName.trim()) {
    values.push(fullName.trim());
    updates.push(`full_name = $${values.length}`);
  }

  if (typeof email === "string" && email.trim()) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      return res
        .status(400)
        .json({ error: "A valid email address is required." });
    }

    values.push(normalizedEmail);
    updates.push(`email = $${values.length}`);
  }

  if (typeof role === "string") {
    const normalizedRole = role.trim();
    values.push(normalizedRole || null);
    updates.push(`role = $${values.length}`);
  }

  if (typeof squad === "string") {
    const normalizedSquad = squad.trim();
    values.push(normalizedSquad || null);
    updates.push(`squad = $${values.length}`);
  }

  if (typeof emergencyContact === "string") {
    const normalizedEmergencyContact = emergencyContact.trim();
    values.push(normalizedEmergencyContact || null);
    updates.push(`emergency_contact = $${values.length}`);
  }

  if (typeof membershipId === "string") {
    const normalizedMembershipId = membershipId.trim();

    if (!normalizedMembershipId) {
      return res.status(400).json({ error: "Membership ID cannot be empty." });
    }

    values.push(normalizedMembershipId);
    updates.push(`membership_id = $${values.length}`);
  }

  if (typeof profilePhotoUrl === "string") {
    const normalizedProfilePhotoUrl = profilePhotoUrl.trim();
    values.push(normalizedProfilePhotoUrl || null);
    updates.push(`profile_photo_url = $${values.length}`);
  }

  if (typeof password === "string" && password) {
    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: "Password must be at least 8 characters long." });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      values.push(passwordHash);
      updates.push(`password_hash = $${values.length}`);
    } catch (error) {
      next(error);
      return;
    }
  }

  if (updates.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one field must be provided for update." });
  }

  updates.push("updated_at = NOW()");
  values.push(id);

  try {
    const result = await query(
      `UPDATE members
       SET ${updates.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, full_name, email, role, squad, emergency_contact, membership_id, profile_photo_url, created_at, updated_at`,
      values,
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Member not found." });
    }

    res.json({ member: formatMember(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") {
      const message =
        error.constraint === "members_membership_id_key"
          ? "A member with this membership ID already exists."
          : "A member with this email already exists.";

      res.status(409).json({ error: message });
      return;
    }

    next(error);
  }
});

router.delete("/:id", authenticate, async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
  }

  if (req.auth?.memberId !== id) {
    return res
      .status(403)
      .json({ error: "You do not have access to delete this member." });
  }

  try {
    const result = await query(`DELETE FROM members WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Member not found." });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
