#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const migrationsDir = path.join(__dirname, "migrations");
const MIGRATIONS_TABLE = "schema_migrations";

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

async function ensureMigrationsTable(client) {
  await client.query(
    `CREATE TABLE IF NOT EXISTS ${MIGRATIONS_TABLE} (
      name TEXT PRIMARY KEY,
      run_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )`,
  );
}

async function runMigration(client, file) {
  const filePath = path.join(migrationsDir, file);
  const migrationName = path.parse(file).name;

  const result = await client.query(
    `SELECT 1 FROM ${MIGRATIONS_TABLE} WHERE name = $1`,
    [migrationName],
  );

  if (result.rowCount > 0) {
    console.log(`Skipping migration ${migrationName} (already applied).`);
    return;
  }

  const sql = fs.readFileSync(filePath, "utf8");

  console.log(`Applying migration ${migrationName}...`);
  await client.query(sql);
  await client.query(
    `INSERT INTO ${MIGRATIONS_TABLE} (name) VALUES ($1)`,
    [migrationName],
  );
  console.log(`Migration ${migrationName} applied.`);
}

async function runMigrations() {
  if (!fs.existsSync(migrationsDir)) {
    console.error(`Migrations directory not found at ${migrationsDir}`);
    process.exit(1);
  }

  const migrations = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  if (migrations.length === 0) {
    console.log("No migrations to run.");
    return;
  }

  const pool = new Pool(getDatabaseConfig());
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await ensureMigrationsTable(client);

    for (const migration of migrations) {
      await runMigration(client, migration);
    }

    await client.query("COMMIT");
    console.log("All migrations applied successfully.");
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations().catch((error) => {
  console.error("Unexpected migration error:", error);
  process.exit(1);
});
