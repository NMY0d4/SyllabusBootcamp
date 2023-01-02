const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const dotenv = require("dotenv");
const https = require("https");
const { response } = require("express");

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

    const auth = `greg1:i${process.env.API_KEY_MAILCHIMP}`;

    const options = {
        method: "POST",
        auth,
    };

    const request = https.request(url, options, (response) => {
        response.statusCode === 200
            ? res.sendFile(`${__dirname}/success.html`)
            : res.sendFile(`${__dirname}/failure.html`);

        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();
});

app.post("/failure", (req, res) => {
    res.redirect("/");
});

app.listen(PORT, console.log(`server is running on port ${PORT}`));
