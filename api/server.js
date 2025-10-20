require("dotenv").config();

const express = require("express");
const helmet = require("helmet");

const { registerRoutes } = require("./src/routes");
const { errorHandler } = require("./src/middleware/error-handler");
const { notFoundHandler } = require("./src/middleware/not-found");
const { pool } = require("./src/db/pool");
const { runMigrations } = require("./src/db/migrate");

const app = express();
const PORT = process.env.PORT || 4000;
const MAX_REQUEST_SIZE = process.env.MAX_REQUEST_SIZE || "10mb";

const API_BASE_PATH = "/v1";

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

const listRegisteredRoutes = registerRoutes(app, { basePath: API_BASE_PATH });

app.get(API_BASE_PATH, (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    routes: listRegisteredRoutes(),
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await runMigrations();
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
