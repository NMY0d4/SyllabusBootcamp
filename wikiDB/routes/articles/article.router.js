const express = require("express");

const {
  getAllArticles,
  getOneArticle,
  addOneArticle,
  updateOneArticle,
  deleteAllArticles,
  deleteOneArticle,
} = require("./article.controller");

const articlesRouter = express.Router();

articlesRouter
  .get("/", getAllArticles)
  .get("/:id", getOneArticle)
  .post("/", addOneArticle)
  .patch("/:id", updateOneArticle)
  .delete("/", deleteAllArticles)
  .delete("/:id", deleteOneArticle);
// articlesRouter.delete("/:id");

module.exports = articlesRouter;
