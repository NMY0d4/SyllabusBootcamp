require("dotenv").config();
const Task = require("../models/tasks.model");
const { getDate } = require("../services/date");

let error = "";

const homeTodo = function (req, res) {
    Task.find({}, (err, foundTasks) => {
        res.render("list", {
            listTitle: getDate(process.env.DAY),
            newListItems: foundTasks,
            error,
        });
    });
};

const addTask = function (req, res) {
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
        } catch (err) {
            console.error(`ICI -> ${err}`);
        }
        res.redirect("/todo");
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
                res.redirect(`/${listName}`);
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
};

module.exports = { homeTodo, addTask, deleteTask };
