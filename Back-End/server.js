const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes (IMPORT FIRST)
const authRoutes = require("./routes/authRoutes");
const testProtected = require("./routes/testProtected");

// Routes (USE AFTER IMPORT)
app.use("/api/auth", authRoutes);
app.use("/api", testProtected);

// Test Route
app.get("/", (req, res) => {
  res.send("BAYMAX Backend is working 🚀");
});

// Database + Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌", err);
  });