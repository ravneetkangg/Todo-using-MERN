const router = require('express').Router();
const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

// Register route
router.post("/register", async function(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({ message: "Email, username, and password are required" });
        }

        // Parameterized SQL query: Check if user already exists
        const [existingUsers] = await pool.execute(
            'SELECT id, email, username FROM users WHERE email = ? OR username = ? LIMIT 1',
            [email, username]
        );

        if (existingUsers.length > 0) {
            return res.status(200).json({ message: "User already exists" });
        }

        // Hash password with bcrypt
        const hashPassword = bcrypt.hashSync(password, 10);

        // Parameterized SQL query: Insert new user
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashPassword]
        );

        const newUser = {
            _id: result.insertId,
            id: result.insertId,
            username,
            email
        };

        res.status(200).json({ user: newUser });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Login route
router.post("/login", async function(req, res) {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Parameterized SQL query: Fetch user by email
        const [users] = await pool.execute(
            'SELECT id, username, email, password FROM users WHERE email = ? LIMIT 1',
            [email]
        );

        if (users.length === 0) {
            return res.status(200).json({ message: "Please sign up first" });
        }

        const user = users[0];

        // Verify password hash
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(200).json({ message: "Password is not correct" });
        }

        // Respond with user data (excluding password)
        // Including _id for backward compatibility with frontend
        res.status(200).json({
            _id: user.id,
            id: user.id,
            username: user.username,
            email: user.email
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;