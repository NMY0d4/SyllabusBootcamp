require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const Post = require("./model/post.model");
const { mongoConnect } = require("./services/mongo");

const ejs = require("ejs");
const _ = require("lodash");

const PORT = process.env.PORT;
let homePosts = [];

let error = "";

const homeStartingContent =
    "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent =
    "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent =
    "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
    try {
        const posts = await Post.find({});
        // build new array with the content cut
        homePosts = posts.map((post) => {
            return {
                title: post.title,
                content: _.truncate(post.content, { length: 100 }),
            };
        });
    } catch (err) {
        error = err.message;
    }
    res.render("home", {
        startingContent: homeStartingContent,
        homePosts,
        error,
    });
    error = "";
});

app.get("/about", (req, res) => {
    res.render("about", { startingContent: aboutContent });
});

app.get("/contact", (req, res) => {
    res.render("contact", { startingContent: contactContent });
});

app.get("/compose", (req, res) => {
    res.render("compose");
});

app.post("/compose", async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({ title, content });
    } catch (err) {
        error = err.message;
    }
    res.redirect("/");
});

app.get("/posts/:title", async (req, res) => {
    try {
        const postFound = await Post.findOne({ title: req.params.title });
        return res.render("post", { post: postFound });
    } catch (err) {
        error = err.message;
        return res.redirect("/");
    }
});

mongoConnect();

app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});
