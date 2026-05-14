const axios = require("axios");
const cheerio = require("cheerio");
const { INITIAL_DATE, BASE_URL_DIGI } = require("../constants");
const { parseDigiDate } = require("../utils");

const DIGI_PACANELE = "/eticheta/pacanele";

const fetchDigiTagPage = async () => {
  const url = `${BASE_URL_DIGI}${DIGI_PACANELE}`;

  const { data } = await axios.get(url);
  return data;
};

const getDigiArticles = async () => {
  console.log("Run Digi scraper ...");
  const html = await fetchDigiTagPage();
  const $ = cheerio.load(html);

  return $("article.article")
    .map((_, elem) => {
      const relLink = $(elem).find("a").attr("href");

      return {
        title: $(elem).find("h3, h2").text().trim(),
        link: relLink.includes("http") ? relLink : `${BASE_URL_DIGI}${relLink}`,
        date: $(elem).find(".article-date").text().trim(),
      };
    })
    .get()
    .filter((article) => parseDigiDate(article.date) >= INITIAL_DATE);
};

module.exports = { getDigiArticles };
