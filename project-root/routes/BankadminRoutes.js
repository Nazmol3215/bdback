const express = require('express');
const router = express.Router();
const Bank = require('../models/bankModel');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "123456";

// পাসওয়ার্ড চেক করে অ্যাক্সেস নিশ্চিত করা
router.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ access: true });
  } else {
    res.status(401).json({ access: false });
  }
});

// আপডেট
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Bank.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ডিলিট
router.delete('/delete/:id', async (req, res) => {
  try {
    await Bank.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
