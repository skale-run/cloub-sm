const dotenv = require("dotenv");

const result = dotenv.config();

if (result.error && process.env.NODE_ENV !== "production") {
  console.warn(
    "Warning: Could not load .env file (" + result.error.message + ")",
  );
}

module.exports = result;
