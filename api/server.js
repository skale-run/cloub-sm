require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const membersRouter = require("./src/routes/members");
const calendarEventsRouter = require("./src/routes/calendar-events");
const accessLogsRouter = require("./src/routes/access-logs");
const trainingAttendanceRouter = require("./src/routes/training-attendance");
const trainingInsightsRouter = require("./src/routes/training-insights");
const { errorHandler } = require("./src/middleware/error-handler");
const { notFoundHandler } = require("./src/middleware/not-found");
const { pool } = require("./src/db/pool");

const app = express();
const PORT = process.env.PORT || 4000;
const MAX_REQUEST_SIZE = process.env.MAX_REQUEST_SIZE || "2mb";

const API_BASE_PATH = "/v1";

const API_ROUTES = [
  {
    path: "/members",
    router: membersRouter,
    description: "Member CRUD, authentication, and session management.",
  },
  {
    path: "/calendar-events",
    router: calendarEventsRouter,
    description: "Manage calendar events and scheduling metadata.",
  },
  {
    path: "/access-logs",
    router: accessLogsRouter,
    description: "Query facility access logs with filtering support.",
  },
  {
    path: "/training-attendance",
    router: trainingAttendanceRouter,
    description: "Record and list training attendance logs.",
  },
  {
    path: "/training-insights",
    router: trainingInsightsRouter,
    description: "Aggregated training insights and roster summaries.",
  },
];

app.disable("x-powered-by");
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.json({ limit: MAX_REQUEST_SIZE }));
app.use(express.urlencoded({ extended: true, limit: MAX_REQUEST_SIZE }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.get(API_BASE_PATH, (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    routes: API_ROUTES.map(({ path, description }) => ({
      path: `${API_BASE_PATH}${path}`,
      description,
    })),
  });
});

for (const { path, router } of API_ROUTES) {
  app.use(`${API_BASE_PATH}${path}`, router);
}

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
