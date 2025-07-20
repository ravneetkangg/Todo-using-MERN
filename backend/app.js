require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const dbConnect = require("./config/db");
const auth = require('./routes/auth');
const list = require('./routes/list');

// Middleware
app.use(express.json());
app.use(cors());
dbConnect();

// Routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Environment port
const PORT = process.env.PORT || 4700;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// Root route
app.get('/', (req, res) => {
    res.send("Hello, World!");
});