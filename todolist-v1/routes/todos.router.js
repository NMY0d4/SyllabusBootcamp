const express = require("express");

const {
    homeTodo,
    addTask,
    deleteTask,
    customList,
} = require("./todos.controller");

const todoRouter = express.Router();

todoRouter.route("/").get(homeTodo);
todoRouter.route("/:listName").get(homeTodo);
todoRouter.route("/").post(addTask);
todoRouter.route("/add-new-list").post(customList);
todoRouter.route("/delete").post(deleteTask);

module.exports = todoRouter;
