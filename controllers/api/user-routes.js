const router = require("express").Router();

const { Blog, User } = require("../../models");

// CREATE new user
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body.username);
        const dbUserData = await User.create({
            username: req.body.username,
            password: req.body.password,
        });

        res.status(200).json(dbUserData);

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        console.log(req.body.username);
        const dbUserData = await User.findOne({
            where: {
                username: req.body.username,
            },
        });

        if (!dbUserData) {
            console.log("No user found");
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }

        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            console.log("password didn''t match");
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again!' });
            return;
        }
        const user = dbUserData.get({ plain: true });
        console.log(user);
        req.session.save(() => {
            req.session.loggedIn = true;
            req.session.user_id = user.id;
            req.session.username = user.username;

            console.log("session variables:", req.session.username, req.session.user_id, req.session.loggedIn);
            res
                .status(200)
                .json({ user: dbUserData, message: 'You are now logged in!' });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Logout
router.post("/logout", (req, res) => {

    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});
module.exports = router;