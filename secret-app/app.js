require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
require("./services/mongo").mongoConnect();

const ejs = require("ejs");
const path = require("path");

const usersRouter = require("./routes/users/user.router");

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRouter);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", () => {});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
