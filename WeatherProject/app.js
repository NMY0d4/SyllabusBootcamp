const express = require("express");
const https = require("https");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const API_WEARHER_KEY = process.env.API_WEARHER_KEY;

app.get("/", (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Beuzeville&units=metric&appid=${API_WEARHER_KEY}`;
    https.get(url, (response) => {
        console.log(response.statusCode);

        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const icon = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
            res.write(`<p>The weather is currently ${weatherDesc}</p>`);
            res.write(`<img src="${icon}" alt"meteo icon">`);
            res.write(
                `<h1>The temperature in ${weatherData.name} is ${temp} degrees celsius.</h1>`
            );
            res.send();
        });
    });
});

app.listen(PORT, () => {
    console.log(`listen on ${PORT}`);
});
