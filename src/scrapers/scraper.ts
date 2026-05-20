import { insertArticles } from "../db/queries/articles";
import { getDigiArticles } from "./digiScraper";
import { getProtvArticles } from "./protvScraper";

const fs = require("fs");

export async function runAllScrapers() {
  const digi = await getDigiArticles();
  const protv = await getProtvArticles();

  const allArticles = [
    ...digi.map((a) => ({
      ...a,
      trustName: "DIGI24.ro",
      trustLink: "https://www.digi24.ro/",
    })),
    ...protv.map((a) => ({
      ...a,
      trustName: "stiriliprotv.ro",
      trustLink: "https://stirileprotv.ro/",
    })),
  ];

  await insertArticles(allArticles);
  // console.log(allArticles.map((t) => t.publishedAt));

  console.log(`scraper finished ${new Date()} ...`);
}
