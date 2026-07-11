import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import Layout from "./components/Layout";

// Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Admin
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import AdminManagement from "./pages/AdminManagement";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Content
import Highlight from "./pages/Highlight";
import Hero from "./pages/Hero";
import ProgramManagement from "./pages/ProgramManagement";
import EventManagement from "./pages/EventManagement";
import NewsManagement from "./pages/NewsManagement";
import DownloadManagement from "./pages/DownloadManagement";
import AdminNotice from "./pages/AdminNotice";
import AdminContact from "./pages/AdminContact";
import AdminAbout from "./pages/AdminAbout";
import GalleryManagement from "./pages/GalleryManagement";

// Admission
import AdminAdmissions from "./pages/AdminAdmissionForm";
import AdmissionView from "./pages/AdmissionView";

// Campus
import CampusChiefMessage from "./pages/CampusChiefMessage";

// Routes
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RequirePermission from "./routes/RequirePermission";

// Permission
import { PERMISSIONS } from "./constants/permissions";

// =================================
// ADMIN LAYOUT
// =================================

function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}

// =================================
// APP
// =================================

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===========================
            AUTH
            =========================== 
        */}

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />

        <Route
          path="/reset-password/:token"
          element={
            <PublicRoute>
              <ResetPassword />
            </PublicRoute>
          }
        />

        {/* ===========================
            DASHBOARD
            =========================== 
        */}

        <Route
          path="/"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.DASHBOARD_VIEW]}>
                <Dashboard />
              </RequirePermission>
            </AdminLayout>
          }
        />

        {/* ===========================
            PROFILE
            =========================== 
        */}

        <Route
          path="/profile"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.PROFILE_VIEW]}>
                <Profile />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/change-password"
          element={
            <AdminLayout>
              <ChangePassword />
            </AdminLayout>
          }
        />

        {/* ===========================
            CONTENT MANAGEMENT
            =========================== 
        */}

        <Route
          path="/highlights"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.HIGHLIGHT_READ]}>
                <Highlight />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/heroes"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.HERO_READ]}>
                <Hero />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/program-management"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.PROGRAM_READ]}>
                <ProgramManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/events"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.EVENT_READ]}>
                <EventManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/news"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.NEWS_READ]}>
                <NewsManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/downloads"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.DOWNLOAD_READ]}>
                <DownloadManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/notices"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.NOTICE_READ]}>
                <AdminNotice />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/gallery"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.GALLERY_READ]}>
                <GalleryManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.CONTACT_READ]}>
                <AdminContact />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/about"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.ABOUT_READ]}>
                <AdminAbout />
              </RequirePermission>
            </AdminLayout>
          }
        />

        {/* ===========================
            ADMISSION
            =========================== 
        */}

        <Route
          path="/admission"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.ADMISSION_READ]}>
                <AdminAdmissions />
              </RequirePermission>
            </AdminLayout>
          }
        />

        <Route
          path="/admission/:id"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.ADMISSION_READ]}>
                <AdmissionView />
              </RequirePermission>
            </AdminLayout>
          }
        />

        {/* ===========================
            CAMPUS MESSAGE
            =========================== 
        */}

        <Route
          path="/campusChiefMessage"
          element={
            <AdminLayout>
              <RequirePermission permissions={[PERMISSIONS.CAMPUS_CHIEF_READ]}>
                <CampusChiefMessage />
              </RequirePermission>
            </AdminLayout>
          }
        />

        {/* ===========================
            ADMIN MANAGEMENT
            SUPER ADMIN ONLY
            =========================== 
        */}

        <Route
          path="/admins"
          element={
            <AdminLayout>
              <RequirePermission
                roles={["SUPER_ADMIN"]}
                permissions={[PERMISSIONS.ADMIN_READ]}
              >
                <AdminManagement />
              </RequirePermission>
            </AdminLayout>
          }
        />

          {/* ===========================
          NOT FOUND
          =========================== */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
