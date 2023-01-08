const express = require("express");
const app = express();
app.use(express.json());
// import models
const UserModel = require("../models/Users");
//import bcrypt encryption
const bcrypt = require("bcrypt");
//import jwt authentication
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());

exports.registerUser = async (req, res) => {
  try {
    const phone = req.body.phone;
    const name = req.body.name;
    const password = req.body.password;
    const passwordCheck = req.body.passwordCheck;
    const profile = req.file.originalname;
    if (!phone || !password || !passwordCheck || !name) {
      return res.status(406).json({ err: "need to enter all fields" });
    }
    if (password != passwordCheck) {
      return res.status(406).json({ err: "different passwords" });
    }
    // //   bycrypt password
    let hash = await bcrypt.hashSync(password, 10);
    const user = new UserModel({
      phone: phone,
      name: name,
      password: hash,
      passwordCheck: passwordCheck,
      profile: profile,
    });

    await user.save();
    res.json({ phone, name, password });
  } catch (error) {
    res.status(406).json({ err: "error while registration" });
    // res.send("error full errro");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const phone = req.body.phone;
    const password = req.body.password;
    if (!phone || !password) {
      return res.status(406).json({ err: "need to enter all fields" });
    }

    //finding user with phone
    const user = await UserModel.findOne({ phone });
    if (!user)
      return res.status(406).json({ err: "no account with this phone number" });

    //checking password over bcrypt password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(406).json({ err: "Invalid Credentials" });

    // creating jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      pass: "true",
      phone: user.phone,
      name: user.name,
      password: user.password,
      profile: user.profile,
      token,
    });
  } catch (error) {
    res.status(406).json({ err: "error while login" });
  }
};

exports.findContact = async (req, res) => {
  try {
    const phone = req.body.phone;

    //finding user with phone
    const user = await UserModel.findOne({ phone });
    if (!user) return res.status(406).json({ err: "number not found" });

    res.json({
      pass: "true",
      phone: user.phone,
      name: user.name,
      profile: user.profile,
    });
  } catch (error) {
    res.status(406).json({ err: "error while searching" });
  }
};
