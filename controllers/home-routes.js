const router = require("express").Router();

const { Blog, User } = require("../models");

router.get("/", async (req, res) => {
    // if (!req.session.loggedIn) {
    //   res.redirect("/login");
    // } else {
    // try {
    //     const allJobs = await Job.findAll({
    //         order: [["date", "DESC"]],
    //         include: [
    //             {
    //                 model: User,
    //                 attributes: ["first_name", "last_name", "email"],
    //             },
    //         ],
    //     });

    //     const jobs = allJobs.map((job) => job.get({ plain: true }));

    res.render("homepage", {});

    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json(error);
    // }
    // }
});

//Dashboard
router.get("/dashboard", async (req, res) => {

    res.render("dashboard", {});

});


//New post
router.get("/createpost", async (req, res) => {

    res.render("createpost", {});

});

router.post("/createpost", async (req, res) => {
    try {
        const newPost = await Blog.create({
            title: req.body.postTitle,
            content: req.body.postContent,
            date: new Date(),
            user_id: req.body.user_id,

        });
        res.status(200).json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }

});



module.exports = router;