const express = require("express");

const {
    registerUser,
    loginUser,
    authenticateUser,
    logoutUser,
    authGoogle,
    authcallBack,
    submSecret,
    submitSecret,
} = require("./user.controller");

const usersRouter = express.Router();

usersRouter
    .get("/secrets", authenticateUser)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .get("/logout", logoutUser)
    .get("/auth/google", authGoogle)
    .get("/auth/google/secrets", authcallBack)
    .get("/submit", submSecret)
    .post("/submit", submitSecret);

module.exports = usersRouter;
