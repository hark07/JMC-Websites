import { useEffect, useState } from "react";

import { FaUser, FaPhone, FaEnvelope, FaCamera, FaSave } from "react-icons/fa";

import { toast } from "react-toastify";

import api from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  // ==========================
  // LOAD USER DATA
  // ==========================

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/admin/profile");

      const admin = res.data.data;

      setName(admin.name);
      setPhone(admin.phone);
      setPreview(admin.profileImage);

      setUser(admin);

      localStorage.setItem("admin", JSON.stringify(admin));
    } catch (err) {
      toast.error("Failed to load profile");
    }
  };

  // ==========================
  // IMAGE CHANGE
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image");

      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");

      return;
    }

    setImage(file);

    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // UPDATE PROFILE
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");

      return;
    }

    if (!phone.trim()) {
      toast.error("Phone is required");

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);

      formData.append("phone", phone);

      if (image) {
        formData.append("profileImage", image);
      }

      const response = await api.put("/admin/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updated = response.data.data;

      const newUser = {
        ...user,
        ...updated,
      };

      localStorage.setItem("admin", JSON.stringify(newUser));

      setUser(newUser);

      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Heading */}

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Profile</h1>

          <p className="text-gray-500 mt-2">Update your personal information</p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Image */}

          <div className="flex justify-center">
            <div className="relative">
              <img
                src={
                  preview ||
                  "https://ui-avatars.com/api/?name=Admin&background=2563eb&color=fff"
                }
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-lg"
              />

              <label
                htmlFor="profileImage"
                className="absolute bottom-2 right-0 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full cursor-pointer shadow-lg"
              >
                <FaCamera />

                <input
                  id="profileImage"
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          {/* Name */}

          <div>
            <label className="block mb-2 font-semibold">Full Name</label>

            <div className="flex items-center border rounded-lg px-4">
              <FaUser className="text-gray-500" />

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Full Name"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Email */}

          <div>
            <label className="block mb-2 font-semibold">Email</label>

            <div className="flex items-center border rounded-lg px-4 bg-gray-100">
              <FaEnvelope className="text-gray-500" />

              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-3 bg-transparent outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}

          <div>
            <label className="block mb-2 font-semibold">Phone Number</label>

            <div className="flex items-center border rounded-lg px-4">
              <FaPhone className="text-gray-500" />

              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98XXXXXXXX"
                className="w-full p-3 outline-none"
              />
            </div>
          </div>

          {/* Save Button */}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition-all

            ${
              loading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            <FaSave />

            {loading ? "Updating Profile..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
