const express = require("express");
const cors = require("cors");
const fs = require("fs");

const { startScraperJob } = require("../crons/scraperCron");

const app = express();

app.use(cors());

app.get("/articles", (req, res) => {
  const raw = fs.readFileSync("./data/articles.json");
  const articles = JSON.parse(raw);

  res.json(articles);
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
  startScraperJob();
});
