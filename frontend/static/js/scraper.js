const axios = require("axios");
const cheerio = require("cheerio");

exports.getNews = (url, rootUrl, classSelector) => {
  return axios(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const articles = [];

    $(classSelector).map((i, classSelector) => {
      const title = $(classSelector).find("a").text();
      const href = rootUrl + $(classSelector).find("a").attr("href");
      const img = rootUrl + $(classSelector).find("img").attr("src");
      console.log(img);
      articles.push({
        title,
        href,
        img,
      });
    });
    return articles;
  });
};
