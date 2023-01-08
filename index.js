// import and use express
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

//import and use cors
const cors = require("cors");
app.use(cors());

// dotenv  use to crete env file for secret code.
require("dotenv").config({ path: "./config.env" });
const PORT = process.env.PORT || 8080;

//import multer
const multer = require("multer");
//body parser
const bodyParser = require("body-parser");

// import models
const UserModel = require("./models/Users");

//import database connection file.
const connect = require("./database/connection");
connect();

// import and use mongoose
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb://localhost:27017/mukhar?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
//   { useNewUrlParser: true }
// );
//import multer
const store = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../mukhar/src/media/profiles");
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});
const profiler = multer({ storage: store });

// routes
app.use("/api", require("./router/router"));

//saving to database(post)
// app.post("/register", profiler.single("profile"), async (req, res) => {
//   const phone = req.body.phone;
//   const name = req.body.name;
//   const password = req.body.password;
//   const passwordCheck = req.body.passwordCheck;
//   const profile = req.file.originalname;

//   const user = new UserModel({
//     phone: phone,
//     name: name,
//     password: password,
//     passwordCheck: passwordCheck,
//     profile: profile,
//   });
//   await user.save();
//   res.send("registered");
// });

//starting server at port 3001
app.listen(3001, () => {
  console.log("you are connected");
});
