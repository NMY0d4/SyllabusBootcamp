const mongoose = require("mongoose");

const articlesSchema = {
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
};

const Article = mongoose.model("Article", articlesSchema);

module.exports = Article;
