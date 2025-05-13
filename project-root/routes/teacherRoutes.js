const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacherModel");

// Create
router.post("/", async (req, res) => {
  try {
    const newTeacher = new Teacher(req.body);
    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read
router.get("/", async (req, res) => {
  try {
    const allTeachers = await Teacher.find();
    res.json(allTeachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
