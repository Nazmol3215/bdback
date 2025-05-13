const express = require("express");
const router = express.Router();
const House = require("../models/House");

router.post("/", async (req, res) => {
  const house = new House(req.body);
  await house.save();
  res.send({ success: true, message: "ডেটা সংরক্ষিত হয়েছে।" });
});

router.get("/", async (req, res) => {
  const houses = await House.find();
  res.send(houses);
});

router.put("/:id", async (req, res) => {
  const updated = await House.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(updated);
});

router.delete("/:id", async (req, res) => {
  await House.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

module.exports = router;
