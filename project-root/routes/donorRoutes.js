const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

// নতুন ডোনার যোগ
router.post('/donors', async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// আপডেট ডোনার
router.put('/donors/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (donor.secretCode !== req.body.secretCode) {
      return res.status(401).json({ message: 'সিক্রেট কোড ভুল হয়েছে' });
    }
    const updated = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ডিলিট ডোনার
router.delete('/donors/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (donor.secretCode !== req.body.secretCode) {
      return res.status(401).json({ message: 'সিক্রেট কোড ভুল হয়েছে' });
    }
    await Donor.findByIdAndDelete(req.params.id);
    res.json({ message: 'ডিলিট সফল হয়েছে' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});






// সব ডোনার দেখানো
router.get('/donors', async (req, res) => {
  try {
    const donors = await Donor.find();
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
