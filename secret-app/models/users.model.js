require("dotenv").config();
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.plugin(encrypt, {
//   secret: process.env.MONG_SECRET_KEY,
//   encryptedFields: ["password"],
// });

const User = mongoose.model("User", userSchema);

module.exports = User;
