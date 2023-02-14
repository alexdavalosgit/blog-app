const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

// Register
router.post("/register", async (req, res) => {
    try {
        // hash password with bcrypt package
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);

        // takes req and creates new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        });

        // saves instance to DB
        const user = await newUser.save();
        // sends 200 status and user data
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error); 
    }
})

// Login
router.post("/login", async (req, res) => {
    try {
        // check user credentials
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("Incorrect credentials entered!");

        // check password credentials
        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Incorrect credentials entered!");

        // remove password from response
        const {password, ...others} = user._doc;

        res.status(200).json(others)

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router