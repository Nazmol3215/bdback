const express = require('express');
const router = express.Router();
const Cattle = require('../models/CattleModel');

// নতুন গরু যোগ
router.post('/', async (req, res) => {
  try {
    const cattle = new Cattle(req.body);
    await cattle.save();
    res.status(201).json(cattle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// সব গরু দেখানো
router.get('/', async (req, res) => {
  const data = await Cattle.find();
  res.json(data);
});

module.exports = router;
