import { useState } from "react";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Enter email and password");

      return;
    }

    try {
      setLoading(true);

      const success = await login(email, password);

      if (success) {
        toast.success("Login Successful");

        navigate("/");
      } else {
        toast.error("Invalid Email or Password");
      }
    } catch (error) {
      toast.error("Login Failed");
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
        {/* Logo */}

        <div
          className="
flex
justify-center
mb-5
"
        >
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
          Admin Login
        </h1>

        <p
          className="
text-center
text-white/70
mt-2
mb-6
"
        >
          JMC College Dashboard
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}

          <div>
            <label
              className="
text-white
"
            >
              Email
            </label>

            <div
              className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
            >
              <FaUser
                className="
text-white
"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
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
          </div>

          {/* Password */}

          <div>
            <label
              className="
text-white
"
            >
              Password
            </label>

            <div
              className="
flex
items-center
bg-white/20
rounded-xl
px-4
"
            >
              <FaLock
                className="
text-white
"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                onClick={() => setShowPassword(!showPassword)}
                className="
text-white
"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Login Button */}

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
disabled:opacity-50
"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Forgot Password */}

        <div className="text-center mt-5 flex items-center justify-between">
          <button
            className="
text-white
text-sm
hover:underline
"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>

          <button
            onClick={() => navigate("/register")}
            className="text-white hover:underline font-semibold"
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
