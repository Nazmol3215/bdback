const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ইউজার যুক্ত করা
router.post("/", async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ message: "User saved" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "User save failed" });
  }
});

// ইউজার লিস্ট দেখানো
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

// ইউজার আপডেট করা
router.put("/:id", async (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send({ error: "Invalid Password" });
  }

  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(updated);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "User update failed" });
  }
});

// ইউজার ডিলিট করা
router.delete("/:id", async (req, res) => {
  const adminPassword = req.headers["x-admin-password"];
  if (adminPassword !== process.env.ADMIN_PASSWORD) {
    return res.status(403).send({ error: "Invalid Password" });
  }

  try {
    await User.findByIdAndDelete(req.params.id);
    res.send({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "User delete failed" });
  }
});

module.exports = router;
