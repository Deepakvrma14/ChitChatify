const mongoose = require("mongoose");

const oneToOneMessage = new mongoose.Schema({
  participants: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  message: {
    to: {
        type: mongoose.Schema.ObjectId,
        ref:"User"
    },
    from:{
        type:mongoose.Schema.ObjectId,
        ref: "User"
    },
    type: {
        type:String,
        enum: ["Text", "Media", "Document", "Link"]
    },
    createdAt: {
        type:Date,
        default: Date.now(),
    },
    text: {
        type: String,
    },
    file: {
        type: String,
    }
  }
});

const oneToOneModel = new mongoose.model("OneToOneMessage", oneToOneMessage);

module.exports = oneToOneModel;
