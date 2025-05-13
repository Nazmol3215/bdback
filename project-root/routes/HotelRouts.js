const express = require('express');
const router = express.Router();
const Bank = require('../models/bankModel');

// ডেটা তৈরি
router.post('/add', async (req, res) => {
  try {
    const newEntry = new Bank(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// সব ডেটা দেখানো
router.get('/all', async (req, res) => {
  try {
    const data = await Bank.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
