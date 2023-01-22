const express = require("express");

const {
    homeTodo,
    addTask,
    deleteTask,
    customList,
} = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.get("/", homeTodo);
todoRouter.get("/:customListName", customList);
todoRouter.post("/", addTask);
todoRouter.post("/delete", deleteTask);

module.exports = todoRouter;
