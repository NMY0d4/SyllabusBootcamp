const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { getDay: day } = require("./date");
// const path = require("path");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let listItems = ["Buy Food"];
let workItems = [];

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.render("list", { listTitle: day(), newListItems: listItems });
});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(newItem);
        res.redirect("/work");
    } else {
        listItems.push(newItem);
        res.redirect("/");
    }
});

app.get("/work", (req, res) => {
    res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
