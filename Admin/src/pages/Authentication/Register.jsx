import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");

      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/admin/auth/register", form);

      toast.success(response.data.message || "Registration Successful");

      navigate("/login");
    } catch (error) {
      console.log("Register Error:", error.response?.data);

      toast.error(error.response?.data?.message || "Registration Failed");
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
          Admin Register
        </h1>

        <p
          className="
text-center
text-white/70
mt-2
mb-6
"
        >
          Create JMC Admin Account
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}

          <div
            className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
          >
            <FaUser className="text-white" />

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="
w-full
bg-transparent
outline-none
p-3
text-white
placeholder-white/60
"
            />
          </div>

          {/* Email */}

          <div
            className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
          >
            <FaEnvelope className="text-white" />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="
w-full
bg-transparent
outline-none
p-3
text-white
placeholder-white/60
"
            />
          </div>

          {/* Phone */}

          <div
            className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
          >
            <FaPhone className="text-white" />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="
w-full
bg-transparent
outline-none
p-3
text-white
placeholder-white/60
"
            />
          </div>

          {/* Password */}

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
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
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
              onClick={() => setShowPassword(!showPassword)}
              className="text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}

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
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
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
              onClick={() => setShowConfirm(!showConfirm)}
              className="text-white"
            >
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </button>
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
hover:bg-gray-100
transition
"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div
          className="
text-center
mt-5
"
        >
          <button
            onClick={() => navigate("/login")}
            className="
text-white
hover:underline
"
          >
            Already have account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
