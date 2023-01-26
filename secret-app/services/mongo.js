const mongoose = require("mongoose");

// Mongo DB connection have to be configured in a separate .env file
const MONGO_URL = process.env.MONGODB_URL;

mongoose.connection.once("open", () => {
    console.log("MongoDB Connection ready!");
});

mongoose.connection.on("error", (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.disconnect();
}

module.exports = { mongoConnect, mongoDisconnect };
