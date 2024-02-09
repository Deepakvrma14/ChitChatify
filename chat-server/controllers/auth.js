const jwt = require("jsonwebtoken");

const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const otpGenerator = require("otp-generator");
const signToken = (userId) => {
  jwt.sign({ userId }, process.env.JWT_SECRET);
};
exports.register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filteredBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "email",
    "password"
  );

  const existing_user = await User.findOne({ email: email });
  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email already in use",
    });
  } else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filteredBody, {
      new: true,
      validateModifiedOnly: true,
    }); // only validate those which are updating not for all
    req.userId = existing_user._id;
    next();
  } else {
    const newUser = await User.create(filteredBody);
    // generatiung otp and send email
    req.userId = mew_user._id;
    next();
  }
};
exports.sendOTP = async (req, res, next) => {
    const {userId}  = req;

  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const otp_expiry_time = Date.now()+ 10*60*1000 //10 min after otp sent 
  await findByIdAndUpdate(userId, {
    otp:new_otp,
    otp_expiry_time,

  });
//   TODO SEND Mail
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "both email and pass are required",
    });
  }
  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "email or password incorrect",
    });
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "login success",
    token,
  });
};
