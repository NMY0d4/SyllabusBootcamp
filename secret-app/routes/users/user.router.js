const express = require("express");

const {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
} = require("./user.controller");

const usersRouter = express.Router();

usersRouter
  .get("/secrets", authenticateUser)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser);

module.exports = usersRouter;
