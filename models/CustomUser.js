// models/CustomUser.js
const mongoose = require("mongoose");

const customUserSchema = new mongoose.Schema({
  imageUrl: String,
  imageName: String,
  phone: String,
  profession: String,
  email: String,
});

module.exports = mongoose.model("CustomUser", customUserSchema);
