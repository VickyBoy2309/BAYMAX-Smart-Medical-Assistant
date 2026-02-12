const express = require("express");
const router = express.Router();

const {
  getPendingDoctors,
  approveDoctor,
  rejectDoctor
} = require("../controllers/adminController");

// GET all pending doctors
router.get("/pending-doctors", getPendingDoctors);

// APPROVE doctor
router.put("/approve-doctor/:doctorProfileId", approveDoctor);

// REJECT doctor
router.put("/reject-doctor/:doctorProfileId", rejectDoctor);

module.exports = router;
