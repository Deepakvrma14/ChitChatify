const mongoose =require("mongoose");

const requestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    createdAt: {
        type:Date,
        default:Date.now(),
    }
});

// model for this schema

const friendRequest = new mongoose.model("friendRequest",requestSchema);
module.exports = friendRequest;


