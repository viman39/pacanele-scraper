const { getProtvArticles } = require("./protvScraper");
const { getDigiArticles } = require("./digiScraper");

const fs = require("fs");

async function runAllScrapers() {
  const digi = await getDigiArticles();
  const protv = await getProtvArticles();

  const allArticles = [
    ...digi.map((a) => ({
      ...a,
      source: "DIGI24.ro",
      sourceLink: "https://www.digi24.ro/",
    })),
    ...protv.map((a) => ({
      ...a,
      source: "stiriliprotv.ro",
      sourceLink: "https://stirileprotv.ro/",
    })),
  ];

  fs.writeFileSync(
    "./data/articles.json",
    JSON.stringify(allArticles, null, 2),
  );

  console.log(`scraper finished ${new Date()} ...`);
}

module.exports = { runAllScrapers };
