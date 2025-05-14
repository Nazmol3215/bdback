const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  if (password === process.env.ADMIN_PASSWORD) {
    res.send({ success: true });
  } else {
    res.status(401).send({ success: false, message: "ভুল পাসওয়ার্ড!" });
  }
});

module.exports = router;
