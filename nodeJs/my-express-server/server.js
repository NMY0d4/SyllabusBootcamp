const express = require("express");

const app = express();

app.get("/", (req, res) => {
    console.log(req);
    res.send("<h1>Hello, world!</h1>");
});

app.get("/contact", (req, res) => {
    console.log(req);
    res.send("<h1>contact me at: greg.marini@hotmail.fr</h1>");
});

app.get("/about", (req, res) => {
    console.log(req);
    res.send(
        "<h1>I'm Grégory Marini</h1><p>A web developper... fullstack...</p>"
    );
});
app.get("/hobbies", (req, res) => {
    console.log(req);
    res.send(
        "<h1>My Hobbies: </h1><ul><li>Sciences</li><li>code</li><li>Video games(reflexions)</li></ul>"
    );
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
