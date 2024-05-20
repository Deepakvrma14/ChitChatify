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

const FriendRequest = new mongoose.model("FriendRequest",requestSchema);
module.exports = FriendRequest;


