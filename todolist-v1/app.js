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

    switch (currentDay) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;

        default:
            day = "Error";
            break;
    }

    res.render("list", { day });
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
