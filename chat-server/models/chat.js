const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    groupChat: {
      type: Boolean,
      default: false,
    },
    creator: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    members: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.Chat || model("Chat", schema);

module.exports = Chat;