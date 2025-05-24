const mongoose = require('mongoose');

const cattleSchema = new mongoose.Schema({
  imageLink: String,
  imageName: String,
  phone: String,
  message: String,
});

module.exports = mongoose.model('Cattle', cattleSchema);
