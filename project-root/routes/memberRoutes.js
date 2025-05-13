const express = require('express');
const router = express.Router();
const Member = require('../models/memberModel');

// POST: Add member
router.post('/add', async (req, res) => {
  try {
    const newMember = new Member(req.body);
    await newMember.save();
    res.status(201).send('Member added successfully');
  } catch (error) {
    res.status(500).send('Error adding member');
  }
});

// GET: Get all members
router.get('/all', async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (error) {
    res.status(500).send('Error fetching members');
  }
});

module.exports = router;
