const Article = require("../../models/articles.model");

const getAllArticles = async () => {
  return await Article.find();
};

module.exports = { getAllArticles };
