const router = require('express').Router();
const { pool } = require('../config/db');

// Create Task
router.post("/addTask", async (req, res) => {
    try {
        const { title, body, id } = req.body;

        if (!title || !body || !id) {
            return res.status(400).json({ message: "Title, body, and user ID are required" });
        }

        // Verify that user exists
        const [users] = await pool.execute(
            'SELECT id FROM users WHERE id = ? LIMIT 1',
            [id]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Insert new task into MySQL
        const [insertResult] = await pool.execute(
            'INSERT INTO tasks (user_id, title, body) VALUES (?, ?, ?)',
            [id, title, body]
        );

        // Retrieve the newly created task record
        const [taskRows] = await pool.execute(
            'SELECT id, user_id, title, body, created_at, updated_at FROM tasks WHERE id = ?',
            [insertResult.insertId]
        );

        const row = taskRows[0];
        const taskObject = {
            _id: row.id,
            id: row.id,
            title: row.title,
            body: row.body,
            user: row.user_id,
            created_at: row.created_at,
            updated_at: row.updated_at
        };

        // Provide both 'list' and 'task' keys for seamless frontend compatibility
        res.status(200).json({ list: taskObject, task: taskObject });
    } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Task
router.put("/updateTask/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body;

        if (!title || !body) {
            return res.status(400).json({ message: "Title and body are required" });
        }

        // Parameterized update query
        const [updateResult] = await pool.execute(
            'UPDATE tasks SET title = ?, body = ? WHERE id = ?',
            [title, body, id]
        );

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Fetch updated task
        const [taskRows] = await pool.execute(
            'SELECT id, user_id, title, body, created_at, updated_at FROM tasks WHERE id = ?',
            [id]
        );

        const row = taskRows[0];
        const updatedList = {
            _id: row.id,
            id: row.id,
            title: row.title,
            body: row.body,
            user: row.user_id,
            created_at: row.created_at,
            updated_at: row.updated_at
        };

        res.status(200).json({ message: "Task updated", updatedList });
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete Task
router.delete("/deleteTask/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Parameterized delete query
        const [deleteResult] = await pool.execute(
            'DELETE FROM tasks WHERE id = ?',
            [id]
        );

        if (deleteResult.affectedRows === 0) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Get Tasks by User ID
router.get("/getTasks/:id", async (req, res) => {
    try {
        const userId = req.params.id;

        // Verify that user exists
        const [users] = await pool.execute(
            'SELECT id FROM users WHERE id = ? LIMIT 1',
            [userId]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        // Query user tasks ordered by creation date
        const [taskRows] = await pool.execute(
            'SELECT id, user_id, title, body, created_at, updated_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
            [userId]
        );

        if (taskRows.length === 0) {
            return res.status(200).json({ message: "No tasks created" });
        }

        const tasks = taskRows.map(row => ({
            _id: row.id,
            id: row.id,
            title: row.title,
            body: row.body,
            user: row.user_id,
            created_at: row.created_at,
            updated_at: row.updated_at
        }));

        res.status(200).json({ tasks });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;