const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  image: String,
  name: String,
  number: String,
  type: String,
  address: String,
  imageUrl: String,
  imageName: String,
  phone: String,
});

module.exports = mongoose.model("User", userSchema);
