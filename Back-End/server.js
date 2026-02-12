// ==========================================
// IMPORTS
// ==========================================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ==========================================
// APP INITIALIZATION
// ==========================================
const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// ROUTES IMPORT
// ==========================================
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const testProtected = require("./routes/testProtected");

// ==========================================
// ROUTES USAGE
// ==========================================
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api", testProtected);

// ==========================================
// HEALTH CHECK ROUTE
// ==========================================
app.get("/", (req, res) => {
  res.status(200).json({
    message: "BAYMAX Backend is working 🚀"
  });
});


// ==========================================
// DATABASE CONNECTION + SERVER START
// ==========================================
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌");
    console.error(err);
  });

// ==========================================
// GLOBAL ERROR HANDLER (Optional but Good)
// ==========================================
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection ❌", err);
  process.exit(1);
});
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
