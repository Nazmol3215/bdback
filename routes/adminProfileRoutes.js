const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// এডমিন লগইন চেক
router.post('/admin-profiles/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// ইউজার প্রোফাইল ডিলিট
router.delete('/admin-profiles/:id', async (req, res) => {
  try {
    await UserProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'Profile deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ইউজার প্রোফাইল আপডেট
router.put('/admin-profiles/:id', async (req, res) => {
  try {
    const updated = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
