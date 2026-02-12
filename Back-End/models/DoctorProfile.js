const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  specialization: String,
  experience: Number,
  hospital: String,
  consultationFee: Number,
  availability: Boolean,

  // 🍼 doctor approval status
  approvalStatus: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    default: "PENDING"
  }

}, { timestamps: true });

module.exports = mongoose.model("DoctorProfile", doctorProfileSchema);