const mysql = require('mysql2/promise');
require('dotenv').config();

// Create a connection pool to manage MySQL connections efficiently
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'todo_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Helper function to test DB connection on startup
const dbConnect = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('MySQL Database connection is successful');
        connection.release();
    } catch (error) {
        console.error('Issue in MySQL Database connection:', error.message);
        throw error;
    }
};

module.exports = {
    pool,
    dbConnect
};