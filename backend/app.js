const express = require('express');
const app = express();
const cors = require('cors');

const dbConnect = require("./config/db");
const auth = require('./routes/auth');
const list = require('./routes/list');

app.use(express.json());
app.use(cors());
dbConnect();

app.use("/api/v1", auth);
app.use("/api/v2", list);

const PORT = 4700;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send("Hello, World!");
});