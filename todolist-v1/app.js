require("dotenv").config();
const { getDate } = require("./services/date");
const express = require("express");
const bodyParser = require("body-parser");
// const mongoose = require("mongoose");
// const _ = require("lodash");
const { Template } = require("ejs");
const todo = require("./routes/todos.router");
require("./services/mongo").mongoConnect();
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.use("/todo", todo);

app.get("/", (req, res) => {
    res.render("home", {
        date: getDate(process.env.DAY),
    });
});

// Send an error msg if no route
app.all("*", (req, res, next) => {
    next(new Error(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.get("/:customListName", (req, res) => {
//     if (
//         req.params.customListName !== "favicon.ico" &&
//         req.params.customListName !== "todo"
//     ) {
//         const customListName = _.capitalize(req.params.customListName);

//         List.findOne({ name: customListName }, function (err, foundList) {
//             if (!err) {
//                 if (!foundList) {
//                     // Create a new list
//                     const list = new List({
//                         name: customListName,
//                         items: [],
//                     });
//                     list.save();
//                     res.redirect(`/${customListName}`);
//                 } else {
//                     //Show an existing list
//                     res.render("list", {
//                         listTitle: foundList.name,
//                         newListItems: foundList.items,
//                     });
//                 }
//             }
//         });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});
