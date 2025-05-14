const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
  imageLink: String,
  imageName: String,
  phone: String,
  address: String
});

module.exports = mongoose.model('Hotel', bankSchema);
