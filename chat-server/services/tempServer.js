const express = require("express");
const app = express();
const sendMail = require("./mailer");

app.get("/",(req, res)=>{
    res.send("server");
});
app.get("/mail", sendMail);

app.listen(5000, ()=>{
    console.log("listening on port")
});


