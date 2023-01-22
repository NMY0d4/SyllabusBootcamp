const mongoose = require("mongoose");

const listSchema = {
    name: String,
    items: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Task",
        },
    ],
};

const List = mongoose.model("List", listSchema);

module.exports = List;
