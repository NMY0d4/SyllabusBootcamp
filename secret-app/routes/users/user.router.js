const express = require("express");

const { registerUser } = require("./user.controller");

const usersRouter = express.Router();

usersRouter.post("/register", registerUser);

module.exports = usersRouter;
