const express = require("express");
const bcrypt = require("bcryptjs");
const { query } = require("../db/pool");

const router = express.Router();

function formatMember(row) {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function isValidUuid(value) {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

router.get("/", async (req, res, next) => {
  try {
    const result = await query(
      `SELECT id, full_name, email, created_at, updated_at
       FROM members
       ORDER BY created_at DESC`,
    );

    res.json({ members: result.rows.map(formatMember) });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { fullName, email, password } = req.body ?? {};

  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Full name, email, and password are required." });
  }

  const normalizedFullName = fullName.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedFullName) {
    return res.status(400).json({ error: "Full name is required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: "A valid email address is required." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long." });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await query(
      `INSERT INTO members (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, email, created_at, updated_at`,
      [normalizedFullName, normalizedEmail, passwordHash],
    );

    res.status(201).json({ member: formatMember(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ error: "A member with this email already exists." });
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
      `SELECT id, full_name, email, password_hash, created_at, updated_at
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

    res.json({ member: formatMember(member) });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
  }

  try {
    const result = await query(
      `SELECT id, full_name, email, created_at, updated_at
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

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { fullName, email, password } = req.body ?? {};

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
  }

  const updates = [];
  const values = [];

  if (typeof fullName === "string" && fullName.trim()) {
    values.push(fullName.trim());
    updates.push(`full_name = $${values.length}`);
  }

  if (typeof email === "string" && email.trim()) {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res.status(400).json({ error: "A valid email address is required." });
    }

    values.push(normalizedEmail);
    updates.push(`email = $${values.length}`);
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
    return res.status(400).json({ error: "At least one field must be provided for update." });
  }

  updates.push("updated_at = NOW()");
  values.push(id);

  try {
    const result = await query(
      `UPDATE members
       SET ${updates.join(", ")}
       WHERE id = $${values.length}
       RETURNING id, full_name, email, created_at, updated_at`,
      values,
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Member not found." });
    }

    res.json({ member: formatMember(result.rows[0]) });
  } catch (error) {
    if (error.code === "23505") {
      res.status(409).json({ error: "A member with this email already exists." });
      return;
    }

    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  if (!isValidUuid(id)) {
    return res.status(400).json({ error: "Invalid member id." });
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
