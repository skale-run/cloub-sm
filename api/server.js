require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const membersRouter = require("./src/routes/members");
const calendarEventsRouter = require("./src/routes/calendar-events");
const { errorHandler } = require("./src/middleware/error-handler");
const { notFoundHandler } = require("./src/middleware/not-found");
const { pool } = require("./src/db/pool");

const app = express();
const PORT = process.env.PORT || 4000;

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/members", membersRouter);
app.use("/api/calendar-events", calendarEventsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await pool.query("SELECT 1");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`API server listening on port ${PORT}`);
  });
}

start();

function shutdown() {
  pool
    .end()
    .catch((error) => {
      console.error("Error while closing the database pool", error);
    })
    .finally(() => {
      process.exit(0);
    });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
