const express = require("express");
const path = require("path");
const { getNews } = require("./frontend/static/js/scraper.js");

const app = express();
const PORT = 5505;

app.use(
  "/static",
  express.static(path.resolve(__dirname, "frontend", "static"))
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

app.get("/visir", (req, res) => {
  getNews("https://visir.is/f/frettir", "", ".article-item--split")
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.get("/ruv", (req, res) => {
  getNews("https://ruv.is/frettir", "https://ruv.is", ".views-row")
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
