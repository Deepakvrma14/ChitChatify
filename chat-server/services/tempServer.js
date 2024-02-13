const express = require("express");
const app = express();
const sendEmail = require("./mailer");
require('dotenv').config();
app.get("/", (req, res) => {
  res.send("server");
});
app.get(
  "/mail",
  sendEmail(
    "deepak@gmail.com",
    "temp@gmail.com",
    "testing",
    "text",
    "<h1>hello</h1><h3>world</h3>"
  )
);

app.listen(5000, () => {
  console.log("listening on port");
});
