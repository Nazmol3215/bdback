const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
  name: String,
  bloodGroup: String,
  phone: String,
  address: String,
  lastDonationDate: Date,
  secretCode: String, // ✅ সিক্রেট কোড ফিল্ড
});

module.exports = mongoose.model('Donor', donorSchema);
