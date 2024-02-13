const jwt = require("jsonwebtoken");   
const User = require("../models/user");
const filterObj = require("../utils/filterObj");
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const { promisify } = require("util");
const sendEmail = require("../services/mailer");
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
  sendEmail("deepak@gmail.com",
  "temp@gmail.com",
  "new OTP",
  `your OTP is ${new_otp}`,
  "<h1>10 Min</h1><h3>This is valid for 10 min only</h3>"
  ).then(()=>{

  }).catch((err)=>{
    res.status(500).json({
      status: "error",
      message: "otp sent unsuccessfully on due to server error",
    });
  });
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
// types of routes :  only logged in can access, 
// unprotected routes
// only allow users logged in to have these routes and middleware access to our api
exports.protect = async(req, res, next) =>{
  // jwt token get and check if it's actually there
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    // Bearer serdfhdsfgh456756yerdtfuhjdfgh
    token = req.headers.authorization.split(" ")[1];

  }else if(req.cookies.jwt){
    token = req.cookies.jwt;
  }
  // user not logged in and trying to access the router
  else{
    res.status(400).json({
      status:"error",
      message:"not logged in please login to get access"
    });
    return;
  }
  // verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // if user still exists when he deleted his account for if he's loggin in somewheree else or if he's being blocked and still if trying to access the routes
  const this_user = await User.findById(decoded.userId);
  if(!this_user){
    res.status(400).json({
      status:"error",
      message: "user with this token does not exist"
    });
  }
  // edge case: 2 users have access to same email and one user is logged in already at 10:15 but second user is resetting the password at 10:20 so we shoudlnt allow the first user to have more access to that 

  // if user changed their password after token was issued
  if(this_user.changedPasswordAfter(decoded.iat)){// iat from jwt payload which have time stamp when it was created
    res.status(400).json({
      status:"error",
      message:"user recently changed password, please try again to login"
    });

  }
  req.user = this_user;
  
  next();
  

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
    return;
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

  // update user pass and set reset token and expiry 
  user.password = req.body.password;
  user.confirmPassword = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  
  await user.save();

  // login the user now and send new jwt
// TODO send email about paswword change
  const token = signToken(user._id);
  res.status(200).json({
    status:"success",
    message:"successfully password reset",
    token,
  });
  return;
}

