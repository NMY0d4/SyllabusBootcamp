const express = require("express");

const {
  getAllArticles,
  addOneArticle,
  deleteAllArticles,
  getOneArticle,
  deleteOneArticle,
} = require("./article.controller");

const articlesRouter = express.Router();

articlesRouter
  .get("/", getAllArticles)
  .get("/:id", getOneArticle)
  .post("/", addOneArticle)
  .delete("/", deleteAllArticles)
  .delete("/:id", deleteOneArticle);
// articlesRouter.delete("/:id");

module.exports = articlesRouter;
