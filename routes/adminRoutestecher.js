const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacherModel");

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12345";

// Middleware to verify admin
const verifyAdmin = (req, res, next) => {
  const { password } = req.headers;
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

// Update
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
