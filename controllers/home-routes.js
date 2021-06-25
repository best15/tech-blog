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




module.exports = router;