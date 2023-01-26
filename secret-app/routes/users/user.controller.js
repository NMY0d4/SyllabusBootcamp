const User = require("../../models/articles.model");

exports.registerUser = async (req, res, next) => {
  try {
    await User.create(req.body);

    res.render("secrets");
  } catch (err) {
    console.error(err.message);
  }
};
