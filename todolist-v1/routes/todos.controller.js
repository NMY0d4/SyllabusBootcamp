require("dotenv").config();
const Task = require("../models/tasks.model");
const _ = require("lodash");
const List = require("../models/lists.model");
const { getDate } = require("../services/date");

let error = "";

const homeTodo = async function (req, res) {
    try {
        const tasks = await Task.find({});
        res.render("list", {
            listTitle: getDate(process.env.DAY),
            newListItems: tasks,
            error,
        });
    } catch (err) {
        throw new Error(err);
    }
};

const addTask = function (req, res, next) {
    // const newTask = req.body.newItem;
    error = "";
    const taskName = req.body.newItem;
    const listName = req.body.list;
    if (!taskName) {
        error = "Entrez une tâche avant de valider";
        return res.redirect("/todo");
    }
    const task = new Task({ name: taskName });

    if (listName === getDate(process.env.DAY)) {
        try {
            task.save();
            console.log("Successfully saved default task to DB.");
            return res.redirect("/todo");
        } catch (err) {
            throw new Error(err);
            // console.error(`ICI -> ${err}`);
        }
    } else {
        List.findOne({ name: listName }, function (err, foundList) {
            if (err) {
                console.error(err);
            } else {
                foundList.items.push(task);
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
};

const deleteTask = function (req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === getDate(process.env.DAY)) {
        Task.findByIdAndRemove(checkedItemId, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("item successfully deleted...");
            }
            res.redirect("/todo");
        });
    } else {
        List.findOneAndUpdate(
            { name: listName },
            { $pull: { items: { _id: checkedItemId } } }
        )
            .then((foundList) => {
                console.log(`item deleted from ${foundList.name}`);
                res.redirect(`todo/${listName}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const customList = function (req, res) {
    if (
        req.params.customListName !== "favicon.ico" &&
        req.params.customListName !== "todo"
    ) {
        const customListName = _.capitalize(req.params.customListName);

        List.findOne({ name: customListName }, function (err, foundList) {
            if (!err) {
                if (!foundList) {
                    // Create a new list
                    List.create({
                        name: customListName,
                        items: [],
                    });

                    res.redirect(`/todo/${customListName}`);
                } else {
                    //Show an existing list
                    res.render("list", {
                        listTitle: foundList.name,
                        newListItems: foundList.items,
                        error,
                    });
                }
            }
        });
    }
};

module.exports = { homeTodo, addTask, deleteTask, customList };
