import axios from "axios";
import { load } from "cheerio";
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
  const $ = load(html);

  const articles = $("article.article")
    .map((_, elem) => {
      const relLink = $(elem).find("a")?.attr("href");
      const date = $(elem).find(".article-date")?.text()?.trim();

      return {
        title: $(elem).find("h3, h2").text().trim(),
        link: relLink?.includes("http")
          ? relLink
          : `${BASE_URL_DIGI}${relLink}`,
        publishedAt: parseDigiDate(date),
      };
    })
    .get();

  return articles
    ? articles.filter((article) => {
        return article.publishedAt == undefined
          ? 0
          : article.publishedAt >= INITIAL_DATE;
      })
    : [];
};
