const express = require("express");
const https = require("https");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const API_WEARHER_KEY = process.env.API_WEARHER_KEY;

app.get("/", (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Beuzeville&appid=${API_WEARHER_KEY}`;
    https.get(url, (response) => {
        console.log(response.statusCode);
    });
    res.send("Server is up and running");
    // https://api.openweathermap.org/data/2.5/weather?q=Beuzeville&appid=e9c49332c0a2b345758ade8afb396e68
});

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
});
