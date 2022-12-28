const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
    console.log(`${__dirname}/index.html`);
    res.sendFile(`${__dirname}/index.html`);
});

app.post("/", (req, res) => {
    const num1 = +req.body.num1;
    const num2 = +req.body.num2;

    const result = num1 + num2;
    res.send(`The result of the calculation is ${result}`);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
