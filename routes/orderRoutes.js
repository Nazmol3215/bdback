
// 📁 routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
require('dotenv').config();

// ✅ নতুন অর্ডার তৈরি
router.post('/', async (req, res) => {
  const { name, phone, offer } = req.body;
  if (!name || !phone || !offer) {
    return res.status(400).json({ message: 'সকল তথ্য পূরণ করুন।' });
  }
  try {
    const newOrder = new Order({ name, phone, offer });
    await newOrder.save();
    res.status(201).json({ message: '✅ অর্ডার সফলভাবে গ্রহণ করা হয়েছে।' });
  } catch (error) {
    res.status(500).json({ message: '❌ সার্ভার ত্রুটি।' });
  }
});

// ✅ পাসওয়ার্ড যাচাই করে অর্ডার দেখা
router.post('/admin', async (req, res) => {
  const { password } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: '❌ ভুল পাসওয়ার্ড!' });
  }
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: '❌ ডেটা লোড করতে সমস্যা হয়েছে।' });
  }
});

module.exports = router;
