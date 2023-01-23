const express = require("express");

const { getAllArticles, addOneArticle } = require("./article.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);
articlesRouter.post("/", addOneArticle);
// articlesRouter.delete("/:id");

module.exports = articlesRouter;
