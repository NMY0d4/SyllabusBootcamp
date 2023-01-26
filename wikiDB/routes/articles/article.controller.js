const Article = require("../../models/articles.model");

const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();

    res.status(200).json({
      status: "success",
      results: articles.length,
      data: {
        articles,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const getOneArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const addOneArticle = async (req, res) => {
  try {
    const newArticle = await Article.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        newArticle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "invalid data sent!",
    });
  }
};

const updateOneArticle = async (req, res) => {
  try {
    const doc = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      throw new Error("No document found with that ID", 404);
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteAllArticles = async (req, res) => {
  try {
    await Article.deleteMany();

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

const deleteOneArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

module.exports = {
  getAllArticles,
  getOneArticle,
  addOneArticle,
  updateOneArticle,
  deleteAllArticles,
  deleteOneArticle,
};
