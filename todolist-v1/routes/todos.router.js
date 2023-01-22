const express = require("express");

const { accueilTodo } = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.get("/", accueilTodo);
todoRouter.get("/:customListName");
todoRouter.post("/");
todoRouter.delete("/");

module.exports = todoRouter;
