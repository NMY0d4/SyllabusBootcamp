const express = require("express");

const { homeTodo, addTask } = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.get("/", homeTodo);
todoRouter.get("/:customListName");
todoRouter.post("/", addTask);
todoRouter.delete("/");

module.exports = todoRouter;
