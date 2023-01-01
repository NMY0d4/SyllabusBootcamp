const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
const https = require("https");

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.post("/", (req, res) => {
    const { firstName, lastName, email } = req.body;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                },
            },
        ],
    };

    const jsonData = JSON.stringify(data);

    const url = `https://us13.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_UNIQID}`;

    const options = {
        method: "POST",
        auth: "greg1:4aea1a77435589445a8302725bac1e20-us13",
    };

    const request = https.request(url, options, (res) => {
        res.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));