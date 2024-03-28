const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const friendRequest = require("../models/friendRequest");
exports.updateMe = async (req, res, next) => {
  const { user } = req;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "about",
    "avatar"
  );

  const updated_user = await User.findByIdAndUpdate(user._id, filteredBody, {
    new: true,
    validateModelOnly: true,
  });

  res.status(200).json({
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
      !this_user.friends.include(user._id) &&
      //   to check if the user we got and user from the request are same
      user._id.toString() != req.user._id.toString()
  );
  res.status(200).json({
    status: "success",
    data: remaining_users,
    message: "Remaining users found successfully",
  });
};
//  TODO: Create one to get friend reqyuests
exports.getRequest = async (req, res, next) => {
  // it'll search for the requests on db where am a receiver and popultate and get me fields who sent me requests
  const requests = await friendRequest
    .find({ receiver: req.user._id })
    .populate("sender", "_id firstName lastName");

    res.status(200).json({
      status: "success",
      data: friends,
      message: "Friends Request fetch from DB successfully",
    });
};

exports.getFriends = async (req, res, next) => {
  // user id from the protected router middlewarte that will be running before this
  const this_user = await User.findById(req.user._id).populate(
    "friends",
    "_id firstName lastName"
  );

  res.status(200).json({
    status: "success",
    data: this_user.friends,
    message: "Friends list fetch from DB successfully",
  });
};
