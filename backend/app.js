require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

const { dbConnect } = require("./config/db");
const auth = require('./routes/auth');
const list = require('./routes/list');

// Middleware
app.use(express.json());

const allowedOrigins = [
    "https://todo-ravneet.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173"
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or Postman) or allowed origins
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Root route
app.get('/', (req, res) => {
    res.json({ message: "Todo API (MySQL RDS) is active and running!" });
});

// Start server if executed directly
if (require.main === module) {
    const PORT = process.env.PORT || 4700;

    // Test database connection on startup
    dbConnect().then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    }).catch(err => {
        console.warn("Starting server with DB warning:", err.message);
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} (Database pending connection)`);
        });
    });
}

module.exports = app;