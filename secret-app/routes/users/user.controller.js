const passport = require("passport");

const User = require("../../models/users.model");

exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/");
        }
    });
};

exports.registerUser = async (req, res) => {
    try {
        await User.register({ username: req.body.username }, req.body.password);

        passport.authenticate("local")(req, res, function () {
            res.redirect("/users/secrets");
        });
    } catch (err) {
        console.error(`ICI registerUser -->${err}`);
        res.redirect("/register");
    }
};

exports.loginUser = async (req, res, next) => {
    try {
        const user = await new User({
            username: req.body.username,
            password: req.body.password,
        });
        req.login(user, function (err) {
            if (err) {
                console.error(`ICI loginUser -->${err}`);
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/users/secrets");
                });
            }
        });
    } catch (err) {
        console.error(`ICI registerUser -->${err}`);
    }
};

exports.authenticateUser = (req, res, next) => {
    return req.isAuthenticated()
        ? res.render("secrets")
        : res.redirect("/login");
};

exports.authGoogle = (req, res, next) => {
    passport.authenticate("google", { scope: ["profile"] });
};

exports.authcallBack = (req, res, next) => {
    passport.authenticate("google", { failureRedirect: "/login" }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect("/");
        };
};

exports.submSecret = (req, res, next) => {
    return req.isAuthenticated()
        ? res.render("submit")
        : res.redirect("/login");
};

exports.submitSecret = (req, res, next) => {
    console.log(req.body);
    res.redirect("/");
};
