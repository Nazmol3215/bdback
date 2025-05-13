const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  image: String,
  imageName: String,
  phone: String,
  designation: String,
});

module.exports = mongoose.model('Member', memberSchema);
