const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();

console.log(process.env.PORT);
const PORT = process.env.PORT;

app.get("/", (req, res) => {
    res.send("<h1>Calculator</h1>");
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
