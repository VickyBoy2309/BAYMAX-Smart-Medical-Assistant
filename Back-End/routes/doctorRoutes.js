const express = require("express");
const auth = require("../middleware/authMiddleware");
const DoctorProfile = require("../models/DoctorProfile");

const router = express.Router();

router.get("/dashboard", auth, async (req, res) => {
  if (req.user.role !== "doctor")
    return res.status(403).json({ msg: "Access denied" });

  const profile = await DoctorProfile.findOne({ userId: req.user.userId });
  res.json(profile);
});

module.exports = router;