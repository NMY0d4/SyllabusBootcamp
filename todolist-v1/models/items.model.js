const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});
