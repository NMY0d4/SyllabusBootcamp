const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    const today = new Date();
    const currentDay = today.getDay();
    let day = "";

    if (currentDay === 6 || currentDay === 0) {
        day = "week-end day";
    } else {
        day = "weekday";
    }
    res.render("list", { day });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
