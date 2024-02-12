const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "angel8@ethereal.email",
      pass: "dm6xfKZtXCRhVs9AU6",
    },
  });
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  console.log(info.messageId);
  res.json(info);
};
module.exports = sendMail;


