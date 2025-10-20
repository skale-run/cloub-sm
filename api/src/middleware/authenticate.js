const { getSessionById, verifyToken } = require("../services/auth");

function extractBearerToken(headerValue) {
  if (typeof headerValue !== "string") {
    return null;
  }

  const trimmed = headerValue.trim();

  if (!trimmed.toLowerCase().startsWith("bearer ")) {
    return null;
  }

  const token = trimmed.slice(7).trim();
  return token.length ? token : null;
}

async function authenticate(req, res, next) {
  const token = extractBearerToken(req.headers.authorization);

  if (!token) {
    return res.status(401).json({ error: "Authentication required." });
  }

  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired session." });
  }

  const sessionId = payload?.sid;

  if (!sessionId) {
    return res.status(401).json({ error: "Invalid session token." });
  }

  try {
    const session = await getSessionById(sessionId);

    if (!session) {
      return res.status(401).json({ error: "Session not found." });
    }

    if (session.revoked_at) {
      return res.status(401).json({ error: "Session has been revoked." });
    }

    if (
      session.expires_at &&
      new Date(session.expires_at).getTime() <= Date.now()
    ) {
      return res.status(401).json({ error: "Session has expired." });
    }

    req.auth = {
      memberId: session.member_id,
      sessionId: session.id,
      tokenPayload: payload,
    };

    return next();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  authenticate,
};
