const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require("../models/user");

// Register route
router.post("/register", async function(req, res) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(200).json({ message: "User already exists" });
        }

        const hashPassword = bcrypt.hashSync(password, 10); // Use a salt rounds value of 10
        const user = new User({ email, username, password: hashPassword });
        await user.save();
        res.status(200).json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login route
router.post("/login", async function(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(200).json({ message: "Please sign up first" });
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not correct" });
        }

        // Send user data without the password
        const { password: hashedPassword, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;