#!/usr/bin/env node

const dotenv = require("dotenv");

dotenv.config();

const { runMigrations } = require("../src/db/migrate");

runMigrations()
  .catch((error) => {
    console.error("Unexpected migration error:", error);
    process.exit(1);
  })
  .then(() => {
    if (process.exitCode && process.exitCode !== 0) {
      process.exit(process.exitCode);
    }
  });
