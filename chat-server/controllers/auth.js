const jwt = require("jsonwebtoken");

const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");

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
  const { userId } = req;

  const new_otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  const otp_expiry_time = Date.now() + 10 * 60 * 1000; //10 min after otp sent
  await findByIdAndUpdate(userId, {
    otp: new_otp,
    otp_expiry_time,
  });
  //   TODO SEND Mail

  res.status(200).json({
    status: "success",
    message: "otp sent successfully on mail",
  });
};

exports.verifyOTP = async(req, res, next) =>{
    const {email, otp}= req.body;

    const user  = await User.findOne({
        email,
        otp_expiry_time: {$gt: Date.now()};

    });
    if(!user){
        res.status(400).json({
            status:"error",
            message:"Email invalid or Otp already expired",

        });
    }
    if(!await user.correctOTP(otp, user.otp)){
        res.status(400).json({
            status:"error",
            message: "Error wrong otp ",
        })
    }
    // if otp is correct 
    user.verified = true;
    user.otp= undefined;
    
    await user.save({new:true, validateModifiedOnly:true });
    const token = signToken(user._id);
    res.status(200).json({
    status: "success",
    message: "OTP verified success",
    token,
  });

}
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

// only allow users logged in to have these routes and middleware access to our api
exports.protect = async(req, res, next) =>{

}
exports.forgotPassword = async(req, res, next) =>{
// 1 get mail id 
  const user = await User.findOne({email:req.body.email});
  if(!user){ 
    res.status(400).json({
      status: "error",
      message:"no user with such email"
    });
    
  }
  // generate random reset token
  const resetToken = user.createPasswordResetToken();
  const resetURL = `https://tawk.com/auth/reset-password/?code=${resetToken}`;
  try{
    // todo send email with reset
    res.status(200).json({
      status:"success",
      message:"reset password link sent to mail",
    });
  }catch(error){
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({validateBeforeSave:false});
    res.status(500).json({
      status:"error",
      message:"something went wrong in server side, try again later",
    });
  }
};
exports.resetPassword = async(req, res, next) =>{
  // get user based on token
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = User.findOne({
    passwordResetToken:hashedToken,
    passwordResetExpires: {$gt: Date.now()},

  });
  // passing wrong token or after 10 min
  if(!user){
    res.status(400).json({
      status:"error",
      message:"Token invalid or expired",
    });
  }
  user.password = req.body.password;
  user.confirmPassword = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  

}

