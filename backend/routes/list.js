const router = require('express').Router();
const List = require("../models/list");
const User = require("../models/user");

// Create Task
router.post("/addTask", async(req, res) => {
    try {
        const { title, body, id } = req.body;
        const existingUser = await User.findById(id);
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const list = new List({ title, body, user: existingUser._id });
        await list.save();

        existingUser.lists.push(list._id);
        await existingUser.save();

        res.status(200).json({ list });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update Task
router.put("/updateTask/:id", async(req, res) => {
    try {
        const { title, body } = req.body;
        const updatedList = await List.findByIdAndUpdate(
            req.params.id, { title, body }, { new: true } // Return the updated document
        );

        if (!updatedList) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task updated", updatedList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

// Delete Task
router.delete("/deleteTask/:id", async(req, res) => {
    try {
        const { id } = req.params;

        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ message: "Task not found" });
        }

        await List.findByIdAndDelete(id);

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;




// Get Tasks by User ID
router.get("/getTasks/:id", async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).populate('lists');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.lists.length === 0) {
            return res.status(200).json({ message: "No tasks created" });
        }

        res.status(200).json({ tasks: user.lists });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;