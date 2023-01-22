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
    const taskName = req.body.newItem;
    const listName = req.body.list;
    if (!taskName) {
        error = "Vous devez entrer une tâche avant de valider";
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

module.exports = { homeTodo, addTask };
