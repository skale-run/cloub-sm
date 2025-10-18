const { Pool } = require("pg");

function getDatabaseConfig() {
  const connectionString =
    process.env.DATABASE_URL ??
    "postgres://postgres:postgres@localhost:5432/cloub_sm";

  const sslMode = process.env.PGSSLMODE;

  return {
    connectionString,
    ssl:
      sslMode && sslMode.toLowerCase() === "require"
        ? { rejectUnauthorized: false }
        : undefined,
  };
}

const pool = new Pool(getDatabaseConfig());

pool.on("error", (error) => {
  console.error("Unexpected database error", error);
});

function query(text, params) {
  return pool.query(text, params);
}

module.exports = {
  pool,
  query,
  getDatabaseConfig,
};
