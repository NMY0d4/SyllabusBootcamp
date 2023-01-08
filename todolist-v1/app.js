const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
// const path = require("path");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let listItems = [];

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    const today = new Date();

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
    };

    let day = today.toLocaleDateString("en-US", options);

    res.render("list", { day, listItems });
});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    listItems.push(newItem);
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
