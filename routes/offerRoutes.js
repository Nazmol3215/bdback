const express = require('express');
const router = express.Router();
const Offer = require('../models/Offer');

// নতুন অফার যোগ করা - POST
router.post('/add', async (req, res) => {
  try {
    const { type, price, name, duration, adminPassword } = req.body;

    // সহজ পাসওয়ার্ড চেক (আপনি চাইলে .env থেকে নিন)
    if(adminPassword !== 'admin123'){ 
      return res.status(401).json({ message: 'Unauthorized: Invalid password' });
    }

    const newOffer = new Offer({ type, price, name, duration });
    await newOffer.save();

    res.status(201).json({ message: 'Offer added successfully', offer: newOffer });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// সব অফার GET করা (public)
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.find().sort({ createdAt: -1 });
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
