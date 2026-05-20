import express from "express";
import cors from "cors";
import {
  getArticlesByCity,
  getLatestArticles,
  updateArticle,
} from "../db/queries/articles";
require("dotenv").config();

const { startScraperJob } = require("../crons/scraperCron");

const app = express();

app.use(cors());

app.patch("/articles/:id/update", async (req, res) => {
  const { id } = req.params;

  const updated = await updateArticle(id, {
    deleted: true,
  });

  res.json(updated);
});

app.get("/articles", async (req, res) => {
  const city = req.query.city as string;
  const limit = req?.query?.limit
    ? parseInt(req.query.limit as string)
    : undefined;

  if (city) {
    const data = await getArticlesByCity(city);

    return res.json(data.rows);
  }

  const data = await getLatestArticles(limit);

  res.json(data);
});

app.listen(3000, () => {
  console.log("API running on http://localhost:3000");
  startScraperJob();
});
