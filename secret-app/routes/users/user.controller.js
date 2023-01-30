const session = require("express-session");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const User = require("../../models/users.model");

exports.registerUser = async (req, res) => {
  try {
    await User.register(
      { username: req.body.email },
      req.body.password,
      (err, user) => {
        if (!err) {
          console.log(req.body.email);
          passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
          });
        } else {
          throw new Error(err);
        }
      }
    );
  } catch (err) {
    console.error(`ICI registerUser -->${err}`);
    res.redirect("/register");
  }
};

exports.loginUser = async (req, res, next) => {
  try {
  } catch (err) {}
};

exports.authenticateUser = (req, res, next) => {
  return req.isAuthenticated() ? res.render("secrets") : res.redirect("/login");
};
