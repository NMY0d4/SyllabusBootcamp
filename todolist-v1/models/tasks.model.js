const mongoose = require("mongoose");

const tasksSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const Task = mongoose.model("Task", tasksSchema);

module.exports = Task;
