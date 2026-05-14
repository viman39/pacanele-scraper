const axios = require("axios");
const cheerio = require("cheerio");
const { BASE_URL_PROTV, INITIAL_DATE } = require("../constants");

const PROTV_PACANELE = "/stiri-despre/pacanele";
const PROTV_JOCURI_DE_NOROC = "/stiri-despre/jocuri-de-noroc/";

const fetchProtvPage = async (path) => {
  const url = `${BASE_URL_PROTV}${path}`;
  const { data } = await axios.get(url);
  return data;
};

const getProtvArticles = async () => {
  console.log("Run ProTv scraper ...");

  const protvPaths = [PROTV_PACANELE, PROTV_JOCURI_DE_NOROC];
  const articles = [];

  const pages = await Promise.all(
    protvPaths.map((path) => fetchProtvPage(path)),
  );

  pages.forEach((page) => {
    const $ = cheerio.load(page);

    $("article.article").each((_, elem) => {
      const title = $(elem).find("h2.article-title").text()?.trim();
      const date = $(elem).find(".article-date").attr("data-utc-date")?.trim();

      !articles.find((el) => el.title === title) &&
        new Date(date) >= INITIAL_DATE &&
        articles.push({
          title,
          link: $(elem).find("a").attr("href"),
          date,
        });
    });
  });

  return articles;
};

module.exports = { getProtvArticles };
