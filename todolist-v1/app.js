const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { getDate: day } = require("./date");
// const path = require("path");

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connection.once("open", () => {
  console.log("MongoDB Connection ready!");
});

mongoose.connect(process.env.MONGODB_URL);

/////////////////////////////////////////////////////////////////
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "maîtriser mongoDB",
});

const item2 = new Item({
  name: "maîtriser nodeJS",
});

const defaultItems = [item1, item2];

///////////////////////////////////////////////////////////////////

let errorItem = "";

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems, function (err) {
        if (err) {
          console.error(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: day(),
        newListItems: foundItems,
        errorItem,
      });
    }
  });
});

app.post("/", (req, res) => {
  errorItem = "";
  const newItem = req.body.newItem;
  if (!newItem) {
    errorItem = "you must enter an item...";
    return res.redirect("/");
  }
  const itemName = req.body.newItem;
  const item = new Item({ name: itemName });
  item.save();
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("item successfully deleted...");
    }
    res.redirect("/");
  });
});

app.get("/work", (req, res) => {
  res.render("list", { listTitle: "Work", errorItem });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
