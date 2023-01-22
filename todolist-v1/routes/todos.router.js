const express = require("express");

const {
    homeTodo,
    addTask,
    deleteTask,
    customList,
} = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.route("/").get(homeTodo);
todoRouter.route("/:customListName").get(customList);
todoRouter.route("/").post(addTask);
todoRouter.route("/delete").post(deleteTask);

module.exports = todoRouter;
