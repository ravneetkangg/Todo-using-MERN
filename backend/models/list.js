const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }]
});


const List = mongoose.model("List", ListSchema);
module.exports = List;