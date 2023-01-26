const Article = require("../../models/articles.model");

exports.getHome = async (req, res) => {
  const articles = await Article.find();
  res.render("home", { articles });
};
