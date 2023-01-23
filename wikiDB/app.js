require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const { Template } = require("ejs");
require("./services/mongo").mongoConnect();
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.end(console.log("Tous est ok..."));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
