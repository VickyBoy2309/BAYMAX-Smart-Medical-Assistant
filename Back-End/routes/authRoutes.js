const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const DoctorProfile = require("../models/DoctorProfile");

const router = express.Router();

/* =========================
   REGISTER (PATIENT + DOCTOR)
========================= */
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role = "patient",
      specialization = "",
      experience = "",
      hospital = ""
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isApproved: role === "doctor" ? false : true
    });

    if (role === "doctor") {
      await DoctorProfile.create({
        userId: user._id,
        specialization,
        experience,
        hospital,
        approvalStatus: "PENDING"
      });

      return res.json({
        message: "Doctor registered successfully. Waiting for admin approval."
      });
    }

    res.json({
      message: "Patient registered successfully."
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN ATTEMPT:", email, password);

    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    if (!user)
      return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    if (user.role === "doctor" && !user.isApproved) {
      return res.status(403).json({
        message: "Doctor not approved yet"
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;