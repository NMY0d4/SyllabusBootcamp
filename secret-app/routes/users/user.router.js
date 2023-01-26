const express = require("express");

const { registerUser, loginUser } = require("./user.controller");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);
usersRouter.post("/login", loginUser);

module.exports = usersRouter;
