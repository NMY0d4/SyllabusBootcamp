const User = require("../../models/users.model");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.registerUser = async (req, res, next) => {
  try {
    bcrypt.hash(req.body.password, saltRounds, async function (err, hash) {
      const email = req.body.email;
      const password = hash;
      await User.create({ email, password });
    });
    res.render("secrets");
  } catch (err) {
    console.error(err.message);
  }
};

exports.loginUser = async (req, res, next) => {
  const userEmail = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email: userEmail });
    bcrypt.compare(password, user.password, function (err, result) {
      result && res.render("secrets");
    });
  } catch (err) {
    console.error(err.message);
  }
};
