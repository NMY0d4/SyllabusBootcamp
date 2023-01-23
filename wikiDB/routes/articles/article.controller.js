const Article = require("../../models/articles.model");

const getAllArticles = async (req, res) => {
  try {
    return await Article.find({}, (err, foundArticles) => {
      res.send(foundArticles);
    });
  } catch (err) {
    console.error(err.message);
  }
};
const addOneArticle = async (req, res) => {
  console.log(req.body);
  //   try {
  //     await Article.create(req.body, (err,newArticle) = {
  //         res.status()
  //     })
  //   } catch (err) {}
};

module.exports = { getAllArticles, addOneArticle };
