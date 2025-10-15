const express = require("express");
const helmet = require("helmet");

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

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
