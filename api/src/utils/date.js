const MS_PER_DAY = 24 * 60 * 60 * 1000;

function toDate(value) {
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  if (typeof value === "string" || typeof value === "number") {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new TypeError("Invalid date value");
    }
    return parsed;
  }

  throw new TypeError("Invalid date value");
}

function startOfWeek(input) {
  const date = toDate(input);
  const day = date.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(date.getTime());
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() + diff);
  return start;
}

function addDays(input, days) {
  const date = toDate(input);
  return new Date(date.getTime() + days * MS_PER_DAY);
}

function toIsoString(value) {
  if (value === null || value === undefined) {
    return null;
  }

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value === "string") {
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      throw new TypeError("Invalid date string");
    }
    return parsed.toISOString();
  }

  throw new TypeError("Unsupported date value");
}

module.exports = {
  addDays,
  startOfWeek,
  toDate,
  toIsoString,
};
