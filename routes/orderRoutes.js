const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');

// অর্ডার যোগ করা
router.post('/', async (req, res) => {
  const { name, phone, offerName } = req.body;
  if (!name || !phone || !offerName) {
    return res.status(400).json({ message: 'সকল তথ্য দিন' });
  }

  try {
    const newOrder = new Order({ name, phone, offerName });
    await newOrder.save();
    res.status(201).json({ message: 'অর্ডার সফল হয়েছে' });
  } catch (error) {
    res.status(500).json({ message: 'সার্ভার ত্রুটি', error });
  }
});

// অর্ডারগুলো দেখা (পাসওয়ার্ড লাগবে)
const ADMIN_PASSWORD = '123456';

router.get('/', (req, res) => {
  const password = req.query.password;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'অবৈধ পাসওয়ার্ড' });
  }

  Order.find().sort({ createdAt: -1 })
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: 'ডেটা আনা যায়নি' }));
});




// ডিলিট রাউট
router.delete('/:id', async (req, res) => {
  const { password } = req.query;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'পাসওয়ার্ড ভুল' });

  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'সফলভাবে ডিলিট হয়েছে' });
  } catch (err) {
    res.status(500).json({ message: 'ডিলিট করতে সমস্যা হয়েছে' });
  }
});

// আপডেট রাউট
router.put('/:id', async (req, res) => {
  const { password } = req.query;
  const { offerName, phone } = req.body;
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ message: 'পাসওয়ার্ড ভুল' });

  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { offerName, phone },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'আপডেট করতে সমস্যা হয়েছে' });
  }
});


module.exports = router;







