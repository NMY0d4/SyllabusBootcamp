const express = require("express");

const {
  registerUser,
  loginUser,
  authenticateUser,
  logoutUser,
  authGoogle,
  authcallBack,
} = require("./user.controller");

const usersRouter = express.Router();

usersRouter
  .get("/secrets", authenticateUser)
  .post("/register", registerUser)
  .post("/login", loginUser)
  .get("/logout", logoutUser)
  .get("/auth/google", authGoogle)
  .get("/auth/google/secrets", authcallBack);

module.exports = usersRouter;
