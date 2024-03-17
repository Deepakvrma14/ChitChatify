const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });
const email = process.env.NODEMAILER_EMAIL;
const password = process.env.NODEMAILER_PASSWORD;

const sendEmail = ( ato, asubject, atext, ahtml) => {
  return new Promise(async (resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: email,
          pass: password,
        },
      });
      // const transporter = nodemailer.createTransport({
      //   host: "smtp.ethereal.email",
      //   port: 587,
      //   auth: {
      //     user: email,
      //     pass: password,
      //   },
      // });
      const info = await transporter.sendMail({
        from: email,
        to: ato,
        subject: asubject,
        text: atext,
        html: ahtml,
      });
      
      console.log(info.messageId);
      resolve(info);
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = sendEmail;
