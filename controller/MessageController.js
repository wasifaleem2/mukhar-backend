const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// import models
const UserModel = require("../models/Users");
const MessageModel = require("../models/Messages");


exports.recipientsList = async (req, res) => {
  try {
    UserModel.find(
      // {},
      (err, recipients) => {
        if (err) {
          res.send(err, { status: "error", msg: "error fetching list" });
        } else {
          res.json({
            status: "success",
            recipients,
          });
        }
      }
    );
  } catch (error) {
    res.status(406).json({ err: "error while registration" });
    // res.send("error full errro");
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const senderNumber = req.body.senderNumber;
    const receiverNumber = req.body.receiverNumber;
    const text = req.body.text;
    const date = req.body.date;
    const time = req.body.time;
    const messageType = req.body.messageType;
    const messageStatus = req.body.messageStatus;

    if (!senderNumber || !receiverNumber || !messageType || !date || !time || !messageStatus || !text) {
      return res.status(406).json({ err: "error sending message" });
    }
    const message = new MessageModel({
      senderNumber: senderNumber,
      receiverNumber: receiverNumber,
      text:text,
      date: date,
      time: time,
      messageType: messageType,
      messageStatus: messageStatus,
    });

    await message.save();
    res.json({msg:`Message sent to ${receiverNumber}`, date, time, text, senderNumber, receiverNumber, messageStatus, messageType});
  } catch (error) {
    res.status(406).json({ err: "error while sending message", error });
  }
};

exports.receivedMessages = async (req, res) => {
  try {
    MessageModel.find(
      // {},
      (err, messages) => {
        if (err) {
          res.send(err, { status: "error", msg: "error fetching messages" });
        } else {
          res.json({
            status: "success",
            messages,
          });
        }
      }
    );
  } catch (error) {
    res.status(406).json({ err: "error while fetching messages" });
  }
};