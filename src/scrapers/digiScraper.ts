import axios from "axios";
import cheerio from "cheerio";
import { BASE_URL_DIGI, INITIAL_DATE } from "../constants";
import { parseDigiDate } from "../utils";

const DIGI_PACANELE = "/eticheta/pacanele";

const fetchDigiTagPage = async () => {
  const url = `${BASE_URL_DIGI}${DIGI_PACANELE}`;

  const { data } = await axios.get(url);
  return data;
};

export const getDigiArticles = async () => {
  console.log("Run Digi scraper ...");
  const html = await fetchDigiTagPage();
  const $ = cheerio.load(html);

  const articles = $("article.article")
    .map((_, elem) => {
      const relLink = $(elem).find("a")?.attr("href");
      const date = $(elem).find(".article-date")?.text()?.trim();

      return {
        title: $(elem).find("h3, h2").text().trim(),
        link: relLink?.includes("http")
          ? relLink
          : `${BASE_URL_DIGI}${relLink}`,
        date: date,
      };
    })
    .get();

  return articles
    ? articles.filter((article) => {
        const date = parseDigiDate(article?.date);

        return date == undefined ? 0 : date >= INITIAL_DATE;
      })
    : [];
};
