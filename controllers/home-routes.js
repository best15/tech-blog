const router = require("express").Router();

const { Blog, User, Comment } = require("../models");


//homepage
router.get("/", async (req, res) => {

    try {
        const allPosts = await Blog.findAll({
            order: [["date", "DESC"]],
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const posts = allPosts.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            loggedIn: req.session.loggedIn,
            username: req.session.username,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});


//get post by id
router.get("/post/:id", async (req, res) => {

    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        try {
            const posts = await Blog.findByPk(req.params.id, {
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Comment,

                    },

                ],
            });
            const post = posts.get({ plain: true });


            res.render("posts", {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
});

//Create comments on a specific post
router.post("/post/:id", async (req, res) => {

    try {
        console.log("postcomments:", req.params.id);

        const dbUserComments = await Comment.create({
            content: req.body.usercomments,
            date: new Date(),
            username: req.session.username,
            blog_id: req.params.id,
            user_id: req.session.user_id,

        });

        res.status(200).json(dbUserComments);

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

            res.render("dashboard", {
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                dashboard: true,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    }
});


//Delete posts
router.delete("/dashboard/deletepost", async (req, res) => {
    try {
        await Blog.destroy({
            where: {
                id: req.body.postid,
            }
        });
        res.status(200).send('Post Deleted');
        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


//Update page from Dashboard
router.get("/dashboard/updatepost/:id", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        try {
            const posts = await Blog.findByPk(req.params.id, {
                order: [["date", "DESC"]],
                include: [
                    {
                        model: User,
                        attributes: ['username'],
                    },
                    {
                        model: Comment,

                    },
                ],
            });

            const post = posts.get({ plain: true });

            res.render("updatepost", {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
            });

        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    }
});

//Update post
router.put("/dashboard/updatepost/:id", async (req, res) => {

    try {
        const posts = await Blog.update({ title: req.body.updatedTitle, content: req.body.updatedContent },
            {
                where: {
                    id: req.params.id,
                },

            });

        res.status(200).json(req.params.id);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});

//Create New post screen
router.get("/createpost", async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect("/login");
    } else {
        res.render("createpost",);
    }
});

// Create New post in Blog table
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