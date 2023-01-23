const Article = require("../../models/articles.model");

const getAllArticles = async (req, res) => {
  try {
    return await Article.find({}, (err, foundArticles) => {
      console.log(`Get all articles is OK...`);
    });
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = { getAllArticles };
