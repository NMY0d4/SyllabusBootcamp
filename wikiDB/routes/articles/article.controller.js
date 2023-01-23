const Article = require("../../models/articles.model");

const getAllArticles = async (req, res) => {
    try {
        return await Article.find({}, (err, foundArticles) => {
            res.send(foundArticles);
        });
    } catch (err) {
        console.error(err.message);
    }
};
const addOneArticle = async (req, res, next) => {
    const newArticle = req.body;
    try {
        await Article.create(newArticle);
        res.status(201).send(newArticle);
    } catch (err) {
        console.error(err.message);
    }
    next();
};

module.exports = { getAllArticles, addOneArticle };
