const DoctorProfile = require("../models/DoctorProfile");
const User = require("../models/User");

// ==========================================
// GET ALL PENDING DOCTORS
// ==========================================
exports.getPendingDoctors = async (req, res) => {
  try {
    const pendingDoctors = await DoctorProfile.find({
      approvalStatus: "PENDING"
    }).populate("userId", "name email role isApproved");

    res.status(200).json(pendingDoctors);
  } catch (error) {
    console.error("GET PENDING DOCTORS ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ==========================================
// APPROVE DOCTOR
// ==========================================
exports.approveDoctor = async (req, res) => {
  try {
    const { doctorProfileId } = req.params;

    // 1️⃣ Find doctor profile
    const doctorProfile = await DoctorProfile.findById(doctorProfileId);

    if (!doctorProfile) {
      return res.status(404).json({
        message: "Doctor profile not found"
      });
    }

    // 2️⃣ Update DoctorProfile approvalStatus
    doctorProfile.approvalStatus = "APPROVED";
    await doctorProfile.save();

    // 3️⃣ Update corresponding User.isApproved
    const updatedUser = await User.findByIdAndUpdate(
      doctorProfile.userId,
      { isApproved: true },
      { new: true }
    );

    console.log("APPROVED USER:", updatedUser);

    res.status(200).json({
      message: "Doctor approved successfully"
    });

  } catch (error) {
    console.error("APPROVE DOCTOR ERROR:", error);
    res.status(500).json({
      message: "Server error during approval"
    });
  }
};


// ==========================================
// REJECT DOCTOR
// ==========================================
exports.rejectDoctor = async (req, res) => {
  try {
    const { doctorProfileId } = req.params;

    const doctorProfile = await DoctorProfile.findById(doctorProfileId);

    if (!doctorProfile) {
      return res.status(404).json({
        message: "Doctor profile not found"
      });
    }

    // 1️⃣ Update DoctorProfile
    doctorProfile.approvalStatus = "REJECTED";
    await doctorProfile.save();

    // 2️⃣ Update User.isApproved to false (safety)
    await User.findByIdAndUpdate(doctorProfile.userId, {
      isApproved: false
    });

    res.status(200).json({
      message: "Doctor rejected successfully"
    });

  } catch (error) {
    console.error("REJECT DOCTOR ERROR:", error);
    res.status(500).json({
      message: "Server error during rejection"
    });
  }
};