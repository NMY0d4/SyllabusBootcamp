const express = require("express");
const dotenv = require("dotenv");
const https = require("https");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, console.log(`server is running on port ${PORT}`));
