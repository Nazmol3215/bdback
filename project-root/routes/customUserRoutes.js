// routes/customUserRoutes.js
const express = require("express");
const router = express.Router();
const CustomUser = require("../models/CustomUser");

const ADMIN_PASSWORD = "123456"; // চাইলে env ফাইলে নিতে পারেন

// এডমিন পাসওয়ার্ড যাচাই করার middleware
const verifyAdmin = (req, res, next) => {
  const { password } = req.query;
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// Create User
router.post("/", async (req, res) => {
  try {
    const newUser = new CustomUser(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Creation failed" });
  }
});

// Get All Users
router.get("/", async (req, res) => {
  try {
    const users = await CustomUser.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Update User (Admin Only)
router.put("/:id", verifyAdmin, async (req, res) => {
  try {
    const updated = await CustomUser.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Update failed" });
  }
});

// Delete User (Admin Only)
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await CustomUser.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
