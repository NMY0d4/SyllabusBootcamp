const accueilTodo = function (req, res) {
    Item.find({}, (err, foundItems) => {
        if (foundItems.length === 0) {
            Item.insertMany(defaultItems)
                .then(() => {
                    console.log("Successfully saved default items to DB.");
                })
                .catch((err) => {
                    errorItem = err.message;
                    res.redirect("/");
                });
            res.redirect("/");
        } else {
            res.render("list", {
                listTitle: getDate(DAY),
                newListItems: foundItems,
            });
        }
    });
};
module.exports = { accueilTodo };
