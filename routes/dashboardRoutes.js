const express = require('express');
const router = express.Router();
const Cattle = require('../models/CattleModel');

const ADMIN_PASSWORD = 'mySecret123'; // পরিবর্তনযোগ্য

// এডমিন লগইন
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Password ভুল' });
  }
});

// আপডেট
router.put('/:id', async (req, res) => {
  try {
    const updated = await Cattle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ডিলিট
router.delete('/:id', async (req, res) => {
  try {
    await Cattle.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
