const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isValidUuid(value) {
  return typeof value === "string" && UUID_REGEX.test(value);
}

function createValidationError(message) {
  const error = new Error(message);
  error.status = 400;
  error.expose = true;
  return error;
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
    throw createValidationError(
      `${fieldName} must be a valid ISO 8601 date-time string.`,
    );
  }

  return parsed.toISOString();
}

function parseLimitParam(
  value,
  { fieldName = "limit", defaultValue = 100, min = 1, max = 500 } = {},
) {
  if (value === undefined) {
    return defaultValue;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < min || parsed > max) {
    throw createValidationError(
      `${fieldName} must be an integer between ${min} and ${max}.`,
    );
  }

  return parsed;
}

module.exports = {
  isValidUuid,
  normalizeOptionalString,
  parseIsoDate,
  parseLimitParam,
};
