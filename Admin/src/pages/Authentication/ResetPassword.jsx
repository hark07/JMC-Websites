import { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaGraduationCap } from "react-icons/fa";

import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";

import api from "../../api/axios";

export default function ResetPassword() {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("All fields are required");

      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        `/admin/auth/reset-password/${token}`,

        {
          password,
          confirmPassword,
        },
      );

      toast.success(res.data.message || "Password reset successfully");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
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
rounded-2xl
p-8
shadow-2xl
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
            <FaGraduationCap className="text-white text-4xl" />
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
          Reset Password
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5 mt-6">
          <div>
            <label className="text-white">New Password</label>

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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
w-full
bg-transparent
outline-none
p-3
text-white
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

          <div>
            <label className="text-white">Confirm Password</label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="
w-full
bg-white/20
rounded-xl
p-3
text-white
outline-none
mt-1
"
            />
          </div>

          <button
            disabled={loading}
            className="
w-full
bg-white
text-blue-700
py-3
rounded-xl
font-bold
"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
