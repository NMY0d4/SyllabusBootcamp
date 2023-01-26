const express = require("express");
const { getHome } = require("./view.controller");

const viewRouter = express.Router();

viewRouter.get("/", getHome);

module.exports = viewRouter;
