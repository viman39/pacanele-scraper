const cron = require("node-cron");
const { runAllScrapers } = require("../scrapers/scraper");

const startScraperJob = () => {
  console.log("Starting scraper cron job...");

  runAllScrapers();

  cron.schedule("0 * * * *", async () => {
    console.log("Running scheduled scraping...");

    try {
      await runAllScrapers();
    } catch (err) {
      console.error("Scraper failed:", err);
    }
  });
};

module.exports = { startScraperJob };
