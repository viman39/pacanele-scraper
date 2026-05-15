import cron from "node-cron";
import { runAllScrapers } from "../scrapers/scraper";

export const startScraperJob = () => {
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
