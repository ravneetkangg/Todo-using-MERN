const mongoose = require("mongoose");
require('dotenv').config(); // Load .env variables

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("DB connection is successful"))
        .catch((error) => {
            console.log("Issue in DB connection");
            console.error(error.message);
            process.exit(1);
        });
};

module.exports = dbConnect;