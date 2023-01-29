require("dotenv").config();
const Task = require("../models/tasks.model");
const _ = require("lodash");
const List = require("../models/lists.model");
const { getDate } = require("../services/date");

let error = "";

const homeTodo = async function (req, res) {
    const existingList = req.params.listName;
    let homeOptions = {};

    try {
        if (!existingList) {
            const tasks = await Task.find({});
            homeOptions = {
                listTitle: getDate(process.env.DAY),
                newListItems: tasks,
                error,
            };
        } else {
            homeOptions = {
                listTitle: existingList,
                newListItems: existingList.items,
                error,
            };
        }
        res.render("list", homeOptions);
        error = "";
    } catch (err) {
        console.error(`hometodo controller function -> ${err}`);
    }
};

const addTask = async function (req, res, next) {
    // const newTask = req.body.newItem;
    error = "";

    const taskName = req.body.newItem;
    const listName = req.body.list;
    if (!taskName) {
        error = "Entrez une tâche avant de valider";
        return res.redirect("/todo");
    }
    const task = await new Task({ name: taskName });

    if (listName === getDate(process.env.DAY)) {
        try {
            await task.save();
            console.log("Successfully saved default task to DB.");
            return res.redirect("/todo");
        } catch (err) {
            console.error(`ICI -> ${err}`);
        }
    } else {
        try {
            const foundList = await List.findOne({ name: listName });
            foundList.items.push(task);
            await foundList.save();

            console.log(`${foundList.name} updated!`);

            res.render("list", {
                listTitle: foundList.name,
                newListItems: foundList.items,
                error,
            });
        } catch (err) {
            console.error(`ICI -> ${err}`);
        }
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
                res.redirect(`/todo/${listName}`);
            })
            .catch((err) => {
                console.error(err);
            });
    }
};

const customList = async function (req, res) {
    let newList = req.body.newListName;

    // if (
    //     req.params.customListName !== "favicon.ico" &&
    //     req.params.customListName !== "todo"
    // ) {
    newList = _.capitalize(newList);

    try {
        const existingList = await List.findOne({ name: newList });

        if (existingList) {
            error = "cette liste existe déjà...";
            res.redirect(`${existingList.name}`);
        }

        //  function (err, foundList) {
        //     if (!err) {
        //         if (!foundList) {
        //             // Create a new list
        //             List.create({
        //                 name: customListName,
        //                 items: [],
        //             });

        //             res.redirect(`/todo/${customListName}`);
        //         } else {
        //             //Show an existing list
        //             res.render("list", {
        //                 listTitle: foundList.name,
        //                 newListItems: foundList.items,
        //                 error,
        //             });
        //         }
        //     }
        // });
    } catch (err) {
        console.error(err);
    }
    // }
};

module.exports = { homeTodo, addTask, deleteTask, customList };
