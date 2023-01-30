const express = require("express");

const {
  registerUser,
  loginUser,
  authenticateUser,
} = require("./user.controller");

const usersRouter = express.Router();

usersRouter
  .get("/secrets", authenticateUser)
  .post("/register", registerUser)
  .post("/login", loginUser);

module.exports = usersRouter;
