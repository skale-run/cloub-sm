function errorHandler(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const status = typeof error.status === "number" ? error.status : 500;
  const expose =
    typeof error.expose === "boolean" ? error.expose : status >= 400 && status < 500;
  const message = expose ? error.message : "Internal server error";

  if (!expose) {
    console.error(error);
  }

  res.status(status).json({ error: message });
}

module.exports = { errorHandler };
