const express = require("express");

const { getAllArticles } = require("./article.controller");

const articlesRouter = express.Router();

articlesRouter.get("/", getAllArticles);
// articlesRouter.post("/");
// articlesRouter.delete("/:id");

module.exports = articlesRouter;
