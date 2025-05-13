const express = require('express');
const router = express.Router();
const Member = require('../models/memberModel');

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Middleware: Password check
const checkPassword = (req, res, next) => {
  const password = req.headers["x-admin-password"]; // পাসওয়ার্ড হেডার থেকে নেয়া
  console.log('Received password:', password);  // পাসওয়ার্ড লগ করা
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
};

// PUT: Update member
router.put('/update/:id', checkPassword, async (req, res) => {
  try {
    await Member.findByIdAndUpdate(req.params.id, req.body);
    res.send('Member updated');
  } catch (error) {
    res.status(500).send('Error updating member');
  }
});

// DELETE: Delete member
router.delete('/delete/:id', checkPassword, async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.send('Member deleted');
  } catch (error) {
    res.status(500).send('Error deleting member');
  }
});

module.exports = router;
