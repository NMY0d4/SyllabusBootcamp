require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
require("./services/mongo").mongoConnect();

const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const ejs = require("ejs");
const path = require("path");

const usersRouter = require("./routes/users/user.router");

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

const secret = process.env.SESSION_SECRET;

app.use(
  session({
    secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
