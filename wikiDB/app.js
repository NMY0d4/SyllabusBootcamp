require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const { Template } = require("ejs");
require("./services/mongo").mongoConnect();
const path = require("path");
const articlesRouter = require("./routes/articles/article.router");

//////////////////////////////////////////////////////
////      Créer des articles
// const Article = require("./models/articles.model"):
// Article.create({
//   title: "API",
//   content:
//     "API stands for Application Programming Interface. It is a set of subrouting definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer.",
// });
// Article.create({
//   title: "Bootstrap",
//   content:
//     "This is a framework developed by Twitter that contains pre-made front-end templates for web design.",
// });
// Article.create({
//   title: "DOM",
//   content:
//     "The Document Object Model is like an API for interacting with our HTML.",
// });

////////////////////////////////////////////////////

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
