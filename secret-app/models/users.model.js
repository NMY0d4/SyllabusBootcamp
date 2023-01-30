require("dotenv").config();
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const passport = require("passport");
// const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});

userSchema.plugin(passportLocalMongoose);

// userSchema.plugin(encrypt, {
//   secret: process.env.MONG_SECRET_KEY,
//   encryptedFields: ["password"],
// });

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;
