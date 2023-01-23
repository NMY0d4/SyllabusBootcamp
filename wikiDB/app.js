require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const { Template } = require("ejs");
require("./services/mongo").mongoConnect();
const path = require("path");
const articlesRouter = require("./routes/articles/article.router");

const app = express();

app.use(express.json());

app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.use("/articles", articlesRouter);

app.get("/", (req, res) => {
  res.render("home", {});
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
