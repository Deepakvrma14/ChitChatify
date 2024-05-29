const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const FriendRequest = require("../models/friendRequest");
const { Chat } = require("../models/chat");
const OneToOneMessage = require("../models/OneToOneMessage");
exports.updateMe = async (req, res, next) => {
  console.log("update me controller"  );

  const { firstName, lastName, user_id } = req.body;
  console.log(`user_id: ${user_id} firstName: ${firstName} lastName: ${lastName}`); 

   const updated_user = await User.findByIdAndUpdate(user_id, {firstName, lastName}, {
     new: true,
     validateModelOnly: true,
   });

  return res.status(200).json({
    status: "success",
    data: updated_user,
    message: "Profile Updated successfully!",
  });
};

exports.getUsers = async (req, res, next) => {
  const all_users = await User.find({
    verified: true,
  }).select("firstName lastName _id");
  const this_user = req.user;

  //    condition to filter out and get only the users who arent friends yet
  const remaining_users = all_users.filter(
    (user) =>
      !this_user.friends.includes(user._id) &&
      //   to check if the user we got and user from the request are same
      user._id.toString() != req.user._id.toString()
  );
  return res.status(200).json({
    status: "success",
    data: remaining_users,
    message: "Remaining users found successfully",
  });
};
//  TODO: Create one to get friend reqyuests
exports.getRequest = async (req, res, next) => {
  // it'll search for the requests on db where am a receiver and popultate and get me fields who sent me requests
  const requests = await FriendRequest.find({
    receiver: req.user._id,
  }).populate("sender", "_id firstName lastName");

  return res.status(200).json({
    data: requests,
    status: "success",

    message: "Friends Request fetch from DB successfully",
  });
};

exports.getFriends = async (req, res, next) => {
  const this_user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  );

  return res.status(200).json({
    status: "success",
    data: this_user.friends,
    message: "Friends list fetch from DB successfully",
  });
};
exports.newGroupChat = async (req, res, next) => {
  const { name, members } = req.body;
  // members are user id's of the users who are in the group chat
  if (members.length < 2) {
    return res.status(400).json({
      status: "fail",
      message: "Group chat must have atleast 2 members",
    });
  }
  const allMembers = [...members, req.user._id];
  const newChat = await Chat.create({
    name,
    members: allMembers,
    creator: req.user._id,
    groupChat: true,
  });

  // todo emit event for refetch chat for all memebers

  return res.status(201).json({
    status: "success",
    message: "Group chat created successfully",
  });
};
// controller for getting all the chats of the user
exports.getMessages = async (req, res, next) => {
  const chatId = req.params.id;
  // console.log(chatId);
  console.log(`messages for chat ${chatId} requested`)
  const { page = 1 } = req.query;

  const resultPerPage = 12;
  const skip = (page - 1) * resultPerPage;

  const chat = await OneToOneMessage.findById(chatId);

  if (!chat) {
    return res.status(404).json({
      status: "fail",
      message: "Chat not found",
    });
  }

  const messages = chat.message
    .sort((a, b) => b.created_at - a.created_at)
    .slice(skip, skip + resultPerPage);

  const totalPages = Math.ceil(chat.message.length / resultPerPage) || 0;

  return res.status(200).json({
    success: true,
    messages: messages.reverse(),
    totalPages,
  });
};
