const jwt = require("jsonwebtoken");
const { query } = require("../db/pool");

const DEFAULT_SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

function getSessionTtlSeconds() {
  const rawValue = process.env.SESSION_TTL_SECONDS;

  if (!rawValue) {
    return DEFAULT_SESSION_TTL_SECONDS;
  }

  const parsed = Number(rawValue);

  if (!Number.isFinite(parsed) || parsed <= 0) {
    return DEFAULT_SESSION_TTL_SECONDS;
  }

  return Math.floor(parsed);
}

const SESSION_TTL_SECONDS = getSessionTtlSeconds();
const JWT_SECRET = process.env.JWT_SECRET || "insecure-development-secret";

async function createSession(memberId) {
  const expiresAt = new Date(Date.now() + SESSION_TTL_SECONDS * 1000);

  const result = await query(
    `INSERT INTO auth_sessions (member_id, expires_at)
     VALUES ($1, $2)
     RETURNING id, member_id, expires_at, revoked_at, created_at`,
    [memberId, expiresAt],
  );

  return result.rows[0];
}

async function getSessionById(sessionId) {
  const result = await query(
    `SELECT id, member_id, expires_at, revoked_at
       FROM auth_sessions
      WHERE id = $1`,
    [sessionId],
  );

  return result.rows[0] ?? null;
}

function signSessionToken({ sessionId, memberId }) {
  return jwt.sign(
    {
      sid: sessionId,
      sub: memberId,
    },
    JWT_SECRET,
    {
      expiresIn: SESSION_TTL_SECONDS,
    },
  );
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  JWT_SECRET,
  SESSION_TTL_SECONDS,
  createSession,
  getSessionById,
  signSessionToken,
  verifyToken,
};
