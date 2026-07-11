import { useState } from "react";

import { FaLock, FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

export default function ChangePassword() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOld, setShowOld] = useState(false);

  const [showNew, setShowNew] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required");

      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");

      return;
    }

    try {
      setLoading(true);

      const response = await api.put("/admin/auth/change-password", {
        oldPassword,

        newPassword,

        confirmPassword,
      });

      toast.success(response.data.message || "Password changed successfully");

      setTimeout(() => {
        logout();

        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Password change failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
min-h-screen
flex
items-center
justify-center
bg-gradient-to-br
from-blue-600
via-indigo-600
to-purple-700
px-4
"
    >
      <div
        className="
w-full
max-w-md
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-2xl
shadow-2xl
p-8
"
      >
        <div className="flex justify-center mb-5">
          <div
            className="
bg-white/20
p-4
rounded-full
"
          >
            <FaGraduationCap
              className="
text-white
text-4xl
"
            />
          </div>
        </div>

        <h1
          className="
text-3xl
font-bold
text-center
text-white
"
        >
          Change Password
        </h1>

        <p
          className="
text-center
text-white/70
mt-2
mb-6
"
        >
          Update your account password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <PasswordInput
            label="Old Password"
            value={oldPassword}
            setValue={setOldPassword}
            show={showOld}
            setShow={setShowOld}
          />

          <PasswordInput
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            show={showNew}
            setShow={setShowNew}
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            show={showConfirm}
            setShow={setShowConfirm}
          />

          <button
            type="submit"
            disabled={loading}
            className="
w-full
bg-white
text-blue-700
py-3
rounded-xl
font-bold
hover:bg-gray-100
transition
disabled:opacity-50
"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

// =================================
// PASSWORD INPUT COMPONENT
// =================================

function PasswordInput({
  label,

  value,

  setValue,

  show,

  setShow,
}) {
  return (
    <div>
      <label className="text-white">{label}</label>

      <div
        className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
      >
        <FaLock className="text-white" />

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="********"
          className="
w-full
bg-transparent
outline-none
p-3
text-white
placeholder-white/60
"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-white"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}
