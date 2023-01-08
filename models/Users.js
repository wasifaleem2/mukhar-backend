const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  phone: {
    type: String,
    unique: true,
    // required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    // minlength: 8,
  },
  passwordCheck: {
    type: String,
    required: true,
    // minlength: 8,
  },
  profile: {
    type: String,
    required: "false",
  },
});
const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
