const mongoose = require("mongoose");
const Task = require("./tasks.model");

const listSchema = new mongoose.Schema({
    name: String,
    items: [Task.schema],
});

const List = mongoose.model("List", listSchema);

module.exports = List;
