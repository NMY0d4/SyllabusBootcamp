const express = require("express");

const { homeTodo, addTask, deleteTask } = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.get("/", homeTodo);
todoRouter.get("/:customListName");
todoRouter.post("/", addTask);
todoRouter.post("/delete", deleteTask);

module.exports = todoRouter;
