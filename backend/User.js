const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  title: String,
  description: String,
  audio: { type: Buffer, default: null },
  video: { type: Buffer, default: null },
  image: { type: Buffer, default: null },
  additionalText: [String], 

});

const UserModal = mongoose.model("users2", userSchema);
module.exports = UserModal;

