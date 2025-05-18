const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  type: { type: String, enum: ['MB', 'Minute'], required: true },  // MB অথবা Minute
  price: { type: Number, required: true },                         // মূল্য (৳)
  name: { type: String, required: true },                          // অফারের নাম
  duration: { type: String, required: true },                      // মেয়াদ (যেমন: 3 দিন)
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);
