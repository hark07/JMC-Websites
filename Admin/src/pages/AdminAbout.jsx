import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

function AdminAbout() {
  // ==========================
  // States
  // ==========================

  const [aboutId, setAboutId] = useState("");

  const [loading, setLoading] = useState(false);

  const [campusImagePreview, setCampusImagePreview] = useState("");

  const [chiefImagePreview, setChiefImagePreview] = useState("");

  const [formData, setFormData] = useState({
    campusTitle: "",
    campusDescription1: "",
    campusDescription2: "",

    vision: "",
    mission: "",

    chiefTitle: "",
    chiefMessage1: "",
    chiefMessage2: "",
    chiefMessage3: "",

    chiefName: "",
    chiefPosition: "",

    campusImage: null,
    chiefImage: null,
  });

  // ==========================
  // CREATE / UPDATE
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("campusTitle", formData.campusTitle);
      data.append("campusDescription1", formData.campusDescription1);
      data.append("campusDescription2", formData.campusDescription2);

      data.append("vision", formData.vision);
      data.append("mission", formData.mission);

      data.append("chiefTitle", formData.chiefTitle);
      data.append("chiefMessage1", formData.chiefMessage1);
      data.append("chiefMessage2", formData.chiefMessage2);
      data.append("chiefMessage3", formData.chiefMessage3);

      data.append("chiefName", formData.chiefName);
      data.append("chiefPosition", formData.chiefPosition);

      if (formData.campusImage) {
        data.append("campusImage", formData.campusImage);
      }

      if (formData.chiefImage) {
        data.append("chiefImage", formData.chiefImage);
      }

      // UPDATE

      if (aboutId) {
        const res = await api.put(`/about/${aboutId}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(res.data.message);
      }

      // CREATE
      else {
        const res = await api.post("/about", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(res.data.message);
      }

      fetchAbout();
    } catch (error) {
      console.log(error);

      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Fetch About
  // ==========================

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);

      const res = await api.get("/about");

      if (res.data.success && res.data.data.length > 0) {
        const about = res.data.data[0];

        setAboutId(about._id);

        setFormData({
          campusTitle: about.campusTitle || "",

          campusDescription1: about.campusDescription1 || "",

          campusDescription2: about.campusDescription2 || "",

          vision: about.vision || "",

          mission: about.mission || "",

          chiefTitle: about.chiefTitle || "",

          chiefMessage1: about.chiefMessage1 || "",

          chiefMessage2: about.chiefMessage2 || "",

          chiefMessage3: about.chiefMessage3 || "",

          chiefName: about.chiefName || "",

          chiefPosition: about.chiefPosition || "",

          campusImage: null,

          chiefImage: null,
        });

        setCampusImagePreview(about.campusImage);

        setChiefImagePreview(about.chiefImage);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Input Change
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // Image Change
  // ==========================

  const handleImageChange = (e) => {
    const { name, files } = e.target;

    setFormData({
      ...formData,

      [name]: files[0],
    });

    if (name === "campusImage") {
      setCampusImagePreview(URL.createObjectURL(files[0]));
    }

    if (name === "chiefImage") {
      setChiefImagePreview(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">About Management</h1>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-xl p-8 space-y-8"
        >
          {/* ================= CAMPUS INFORMATION ================= */}

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Campus Information
            </h2>

            {/* Campus Title */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">Campus Title</label>

              <input
                type="text"
                name="campusTitle"
                value={formData.campusTitle}
                onChange={handleChange}
                placeholder="Enter campus title"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Description 1 */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Campus Description 1
              </label>

              <textarea
                rows="5"
                name="campusDescription1"
                value={formData.campusDescription1}
                onChange={handleChange}
                placeholder="Enter first paragraph"
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Description 2 */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Campus Description 2
              </label>

              <textarea
                rows="5"
                name="campusDescription2"
                value={formData.campusDescription2}
                onChange={handleChange}
                placeholder="Enter second paragraph"
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* ================= CAMPUS IMAGE ================= */}

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Campus Image
            </h2>

            <input
              type="file"
              name="campusImage"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full border rounded-lg p-3"
            />

            {campusImagePreview && (
              <img
                src={campusImagePreview}
                alt="Campus"
                className="mt-5 w-72 h-56 object-cover rounded-xl shadow-lg border"
              />
            )}
          </div>

          {/* ================= VISION & MISSION ================= */}

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Vision & Mission
            </h2>

            <div className="mb-6">
              <label className="block font-semibold mb-2">Vision</label>

              <textarea
                rows="5"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                placeholder="Enter campus vision..."
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Mission</label>

              <textarea
                rows="5"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                placeholder="Enter campus mission..."
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          {/* ================= CAMPUS CHIEF ================= */}

          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-3">
              Campus Chief Information
            </h2>

            {/* Chief Title */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Chief Section Title
              </label>

              <input
                type="text"
                name="chiefTitle"
                value={formData.chiefTitle}
                onChange={handleChange}
                placeholder="Campus Chief's Message"
                className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Message 1 */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Chief Message 1
              </label>

              <textarea
                rows="5"
                name="chiefMessage1"
                value={formData.chiefMessage1}
                onChange={handleChange}
                placeholder="Enter first paragraph..."
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Message 2 */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Chief Message 2
              </label>

              <textarea
                rows="5"
                name="chiefMessage2"
                value={formData.chiefMessage2}
                onChange={handleChange}
                placeholder="Enter second paragraph..."
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Message 3 */}

            <div className="mb-6">
              <label className="block font-semibold mb-2">
                Chief Message 3
              </label>

              <textarea
                rows="5"
                name="chiefMessage3"
                value={formData.chiefMessage3}
                onChange={handleChange}
                placeholder="Enter third paragraph..."
                className="w-full border rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            {/* Name & Position */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Chief Name</label>

                <input
                  type="text"
                  name="chiefName"
                  value={formData.chiefName}
                  onChange={handleChange}
                  placeholder="Enter chief name"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">
                  Chief Position
                </label>

                <input
                  type="text"
                  name="chiefPosition"
                  value={formData.chiefPosition}
                  onChange={handleChange}
                  placeholder="Campus Chief"
                  className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Chief Image */}

            <div className="mt-8">
              <label className="block font-semibold mb-3">Chief Image</label>

              <input
                type="file"
                name="chiefImage"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full border rounded-lg p-3"
              />

              {chiefImagePreview && (
                <img
                  src={chiefImagePreview}
                  alt="Chief"
                  className="mt-5 w-72 h-56 rounded-xl object-cover shadow-lg border"
                />
              )}
            </div>
          </div>

          {/* ================= ACTION BUTTON ================= */}

          <div className="pt-6 border-t">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white px-8 py-3 rounded-lg font-semibold"
            >
              {loading
                ? "Please Wait..."
                : aboutId
                  ? "Update About"
                  : "Create About"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default AdminAbout;
