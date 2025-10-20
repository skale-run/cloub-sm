const express = require("express");
const { getTrainingInsights } = require("../services/training-insights");

const router = express.Router();

function parseWeeks(value) {
  if (value === undefined) {
    return undefined;
  }

  const normalized = Number(value);
  if (!Number.isFinite(normalized)) {
    return null;
  }

  if (!Number.isInteger(normalized)) {
    return null;
  }

  if (normalized < 1 || normalized > 12) {
    return null;
  }

  return normalized;
}

router.get("/", async (req, res, next) => {
  try {
    const { weeks: weeksQuery, referenceDate } = req.query;
    const weeks = parseWeeks(weeksQuery);

    if (weeks === null) {
      return res.status(400).json({
        error: "weeks must be an integer value between 1 and 12.",
      });
    }

    const insights = await getTrainingInsights({
      weeks: weeks ?? undefined,
      referenceDate: referenceDate ?? undefined,
    });

    res.json({ trainingInsights: insights });
  } catch (error) {
    if (
      error instanceof TypeError &&
      /Invalid reference date/i.test(error.message)
    ) {
      return res.status(400).json({
        error: "referenceDate must be a valid ISO 8601 date.",
      });
    }

    if (
      error instanceof TypeError &&
      /Invalid date value|Invalid date string/i.test(error.message)
    ) {
      return res.status(400).json({
        error: "referenceDate must be a valid ISO 8601 date.",
      });
    }

    next(error);
  }
});

module.exports = router;
