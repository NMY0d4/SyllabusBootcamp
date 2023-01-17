const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { getDate: day } = require("./date");
const _ = require("lodash");
const { Template } = require("ejs");
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

const listSchema = {
  name: String,
  items: [itemsSchema],
};

const List = mongoose.model("List", listSchema);

///////////////////////////////////////////////////////////////////

app.set("view engine", "ejs");

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems)
        .then(() => {
          console.log("Successfully saved default items to DB.");
        })
        .catch((err) => {
          errorItem = err.message;
          res.redirect("/");
        });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: day(),
        newListItems: foundItems,
      });
    }
  });
});

app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  const itemName = req.body.newItem;
  const listName = req.body.list;
  const item = new Item({ name: itemName });

  if (listName === day()) {
    item
      .save()
      .then(() => {
        console.log("Successfully saved default items to DB.");
        res.redirect("/");
      })
      .catch((err) => {
        // return (errorItem = `Err${err.code}: Item already existing...`);
        console.error(err);
      });
  } else {
    List.findOne({ name: listName }, function (err, foundList) {
      if (err) {
        console.error(err);
      } else {
        foundList.items.push(item);
        foundList
          .save()
          .then(() => {
            console.log(`${foundList.name} updated!`);
          })
          .catch((err) => {
            console.error(err);
          });
        res.redirect(`/${listName}`);
      }
    });
  }
});

app.post("/delete", (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === day()) {
    Item.findByIdAndRemove(checkedItemId, function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log("item successfully deleted...");
      }
      res.redirect("/");
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } }
    )
      .then((foundList) => {
        console.log(`item deleted from ${foundList.name}`);
        res.redirect(`/${listName}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
});

app.get("/:customListName", (req, res) => {
  if (req.params.customListName !== "favicon.ico") {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName }, function (err, foundList) {
      if (!err) {
        if (!foundList) {
          // Create a new list
          const list = new List({
            name: customListName,
            items: [],
          });
          list.save();
          res.redirect(`/${customListName}`);
        } else {
          //Show an existing list
          res.render("list", {
            listTitle: foundList.name,
            newListItems: foundList.items,
          });
        }
      }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}...`);
});
