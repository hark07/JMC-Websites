import dotenv from "dotenv";
dotenv.config();

import dns from "dns";

// ===============================
// DNS FIX (MongoDB Atlas SRV)
// ===============================
dns.setServers(["8.8.8.8", "8.8.4.4"]);

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
// CORS
// ===============================

const allowedOrigins = [
  "https://janajyotimultiplecampus.netlify.app",
  "https://jmc-admin.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS Not Allowed"));
      }
    },
    credentials: true,
  }),
);

// ===============================
// MIDDLEWARE
// ===============================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

// ===============================
// PUBLIC CMS ROUTES
// ===============================

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

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/otp", otpRoutes);
app.use("/api/admin", adminRoutes);
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
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

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
  console.log(`🚀 Server running on port ${PORT}`);
});
