const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { getDate: day } = require("./date");
// const path = require("path");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let listItems = ["Buy Food"];
let workItems = [];
let errorItem = "";

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.render("list", { listTitle: day(), newListItems: listItems, errorItem });
});

app.post("/", (req, res) => {
  errorItem = "";
  const newItem = req.body.newItem;
  if (!newItem) {
    errorItem = "you must enter an item...";
    return res.redirect("/");
  }

  if (req.body.list === "Work") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    listItems.push(newItem);
    res.redirect("/");
  }
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", newListItems: workItems, errorItem });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
