const User = require("../models/User");
const DoctorProfile = require("../models/DoctorProfile");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ==========================================
// REGISTER USER / DOCTOR
// ==========================================
exports.registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);
    const {
      name,
      email,
      password,
      role = "patient",
      specialization = "",
      experience = "",
      hospital = ""
    } = req.body;

    // 1️⃣ Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    // 4️⃣ If Doctor → create DoctorProfile
    if (role === "doctor") {
      try {
        await DoctorProfile.create({
          userId: user._id,
          specialization,
          experience,
          hospital,
          approvalStatus: "PENDING"
        });
      } catch (profileError) {
        // Rollback user if profile creation fails
        await User.findByIdAndDelete(user._id);
        return res.status(500).json({
          message: "Doctor profile creation failed"
        });
      }
    }

    // 5️⃣ IMPORTANT: DO NOT AUTO-LOGIN ON REGISTER
    return res.status(201).json({
      message:
        role === "doctor"
          ? "Doctor registered successfully. Waiting for admin approval."
          : "User registered successfully."
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({
      message: "Server error during registration"
    });
  }
};


// ==========================================
// LOGIN USER / DOCTOR
// ==========================================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 2️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // 3️⃣ If doctor → check approval
    if (user.role === "doctor") {
      const doctorProfile = await DoctorProfile.findOne({
        userId: user._id
      });

      if (!doctorProfile) {
        return res.status(403).json({
          message: "Doctor profile not found"
        });
      }

      if (doctorProfile.approvalStatus !== "APPROVED") {
        return res.status(403).json({
          message: "Doctor account pending admin approval"
        });
      }
    }

    // 4️⃣ Generate JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({
      message: "Server error during login"
    });
  }
};