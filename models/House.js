const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  image: String,
  imageName: String,
  phone: String,
  rent: String,
  type: String,
  gas: String,
  bathroom: String,
  rooms: String,
  address: String,
});

module.exports = mongoose.model("House", houseSchema);
