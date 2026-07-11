import { useState } from "react";
import { FaEnvelope, FaArrowLeft, FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/admin/auth/forgot-password", {
        email,
      });

      const resetURL = res.data.data.resetURL;

      toast.success("Reset link generated");

      // Extract token from URL

      const token = resetURL.split("/").pop();

      // Go Reset Password Page

      navigate(`/reset-password/${token}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
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
          Forgot Password
        </h1>

        <p
          className="
text-center
text-white/70
mt-2
mb-6
"
        >
          Enter your email to reset password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-white">Email</label>

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
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <button
          onClick={() => navigate("/login")}
          className="
mt-5
flex
gap-2
mx-auto
text-white
"
        >
          <FaArrowLeft />
          Back Login
        </button>
      </div>
    </div>
  );
}
