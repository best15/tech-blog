const router = require("express").Router();

const { Blog, User } = require("../models");

router.get("/", async (req, res) => {

    try {
        const allPosts = await Blog.findAll({
            order: [["date", "DESC"]],
            // include: [
            //     {
            //         model: User,
            //         attributes: ["first_name", "last_name", "email"],
            //     },
            // ],
        });

        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render("homepage", { posts });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

//Dashboard
router.get("/dashboard", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        try {
            console.log(req.session.user_id);
            const myPosts = await Blog.findAll({
                where: { user_id: req.session.user_id },
                order: [["date", "DESC"]],

            });

            const posts = myPosts.map((post) => post.get({ plain: true }));

            res.render("dashboard", { posts });

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    }
});


//New post
router.get("/createpost", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        res.render("createpost", {});
    }
});

router.post("/createpost", async (req, res) => {
    try {
        const newPost = await Blog.create({
            title: req.body.postTitle,
            content: req.body.postContent,
            date: new Date(),
            user_id: req.session.user_id,

        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

//Log In
router.get("/login", async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect("/");
    } else {
        res.render("login", {});
    }
});

//Sign Up
router.get("/signup", async (req, res) => {

    res.render("signup", {});

});


module.exports = router;