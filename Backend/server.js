import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

// ===============================
// ROUTES
// ===============================

import heroRoutes from "./routes/heroRoutes.js";
import highlightRoutes from "./routes/highlightRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
import noticeRoutes from "./routes/noticeRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";
import admissionRoutes from "./routes/admissionRoutes.js";
import campusChiefMessageRoutes from "./routes/campusChiefMessageRoutes.js";

// Admin Routes
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";

const app = express();

// ===============================
// DATABASE
// ===============================

connectDB();

// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ===============================
// API ROUTES
// ===============================

// Public CMS Routes

app.use("/api/heroes", heroRoutes);

app.use("/api/highlights", highlightRoutes);

app.use("/api/programs", programRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/news", newsRoutes);

app.use("/api/downloads", downloadRoutes);

app.use("/api/notices", noticeRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/about", aboutRoutes);

app.use("/api/gallery", galleryRoutes);

app.use("/api/admissions", admissionRoutes);

app.use("/api/campus-chief-message", campusChiefMessageRoutes);

// ===============================
// ADMIN ROUTES
// ===============================

// Login/Register/Refresh

app.use("/api/admin/auth", adminAuthRoutes);

// OTP

app.use("/api/admin/otp", otpRoutes);

// Admin CRUD

app.use("/api/admin", adminRoutes);


// Activity Logs

app.use("/api/admin/activity", activityRoutes);

// ===============================
// HOME ROUTE
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,

    message: "JMC Backend API Running Successfully",
  });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.log("GLOBAL ERROR:", err);

  res.status(500).json({
    success: false,

    message: err.message || "Internal Server Error",
  });
});

// ===============================
// 404 HANDLER
// ===============================

app.use((req, res) => {
  res.status(404).json({
    success: false,

    message: "API Route Not Found",
  });
});

// ===============================
// SERVER START
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
