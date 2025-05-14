const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  imageLink: String,
  imageName: String,
  phone: String,
  profession: String,
  address: String
});

module.exports = mongoose.model("Profile", profileSchema);
