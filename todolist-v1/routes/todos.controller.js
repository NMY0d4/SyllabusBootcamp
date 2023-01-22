require("dotenv").config();
const Task = require("../models/tasks.model");
const { getDate } = require("../services/date");

const homeTodo = function (req, res) {
    Task.find({}, (err, foundTasks) => {
        res.render("list", {
            listTitle: getDate(process.env.DAY),
            newListItems: foundTasks,
        });
    });
};

const addTask = function (req, res) {
    // const newTask = req.body.newItem;
    const taskName = req.body.newItem;
    const listName = req.body.list;
    const task = new Task({ name: taskName });

    if (listName === getDate(process.env.DAY)) {
        try {
            task.save();
            console.log("Successfully saved default task to DB.");
            res.redirect("/todo");
        } catch (err) {
            console.error(err);
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

module.exports = { homeTodo, addTask };
