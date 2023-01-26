const User = require("../../models/users.model");

exports.registerUser = async (req, res, next) => {
  try {
    await User.create(req.body);

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
    user.password === password && res.render("secrets");
  } catch (err) {
    console.error(err.message);
  }
};
