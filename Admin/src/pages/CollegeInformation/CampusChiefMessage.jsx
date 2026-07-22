import { useEffect, useState } from "react";
import { FaUserTie, FaUpload, FaSave, FaTrash } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "react-toastify";

export default function CampusChiefMessage() {
  const [form, setForm] = useState({
    name: "",
    designation: "",
    message: "",
    signature: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [chief, setChief] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChief();
  }, []);

  // ==========================
  // GET DATA
  // ==========================

  const fetchChief = async () => {
    try {
      const res = await api.get("/campus-chief-message");

      if (res.data.data) {
        const data = res.data.data;

        setChief(data);

        setForm({
          name: data.name,
          designation: data.designation,
          message: data.message,
          signature: data.signature,
        });

        setPreview(data.image);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // IMAGE CHANGE
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==========================
  // CREATE
  // ==========================

  const createChief = async () => {
    try {
      setLoading(true);

      if (!form.name.trim()) return toast.warning("Name is required");

      if (!form.designation.trim())
        return toast.warning("Designation is required");

      if (!form.message.trim()) return toast.warning("Message is required");

      if (!form.signature.trim()) return toast.warning("Signature is required");

      if (!image) return toast.warning("Please upload an image");

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("message", form.message);
      formData.append("signature", form.signature);
      formData.append("image", image);

      const res = await api.post("/campus-chief-message", formData);

      toast.success(res.data.message);

      fetchChief();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // UPDATE
  // ==========================

  const updateChief = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("designation", form.designation);
      formData.append("message", form.message);
      formData.append("signature", form.signature);

      if (image) {
        formData.append("image", image);
      }

      const res = await api.put(`/campus-chief-message/${chief._id}`, formData);

      toast.success(res.data.message);

      fetchChief();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // DELETE
  // ==========================

  const deleteChief = async () => {
    try {
      const res = await api.delete(`/campus-chief-message/${chief._id}`);

      toast.success(res.data.message);

      setChief(null);
      setImage(null);
      setPreview("");

      setForm({
        name: "",
        designation: "",
        message: "",
        signature: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-8 py-5 flex items-center gap-3">
          <FaUserTie className="text-3xl" />
          <div>
            <h1 className="text-2xl font-bold">Campus Chief Message</h1>
            <p className="text-blue-100 text-sm">
              Manage Campus Chief Information
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 p-8">
          {/* ================= IMAGE ================= */}

          <div>
            <h2 className="font-semibold text-lg mb-4">Profile Photo</h2>

            <div className="bg-gray-50 border rounded-2xl p-5">
              <div className="w-full h-96 border-2 border-dashed border-gray-300 rounded-xl overflow-hidden flex justify-center items-center bg-white">
                {preview ? (
                  <img
                    src={preview}
                    alt="Campus Chief"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-gray-400">
                    <FaUserTie className="text-7xl mx-auto mb-4" />

                    <p>No Image Selected</p>
                  </div>
                )}
              </div>

              <label className="mt-6 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl cursor-pointer transition">
                <FaUpload />
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </label>
            </div>
          </div>

          {/* ================= FORM ================= */}

          <div className="lg:col-span-2">
            <h2 className="font-semibold text-lg mb-6">Campus Chief Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}

              <div>
                <label className="font-medium">Full Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Designation */}

              <div>
                <label className="font-medium">Designation</label>

                <input
                  type="text"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                  placeholder="Campus Chief"
                  className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Signature */}

            <div className="mt-6">
              <label className="font-medium">Signature</label>

              <input
                type="text"
                name="signature"
                value={form.signature}
                onChange={handleChange}
                placeholder="Signature"
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Message */}

            <div className="mt-6">
              <label className="font-medium">Campus Chief Message</label>

              <textarea
                rows={9}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write message..."
                className="mt-2 w-full border rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="text-right mt-2 text-sm text-gray-500">
                {form.message.length} Characters
              </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}

            <div className="mt-8 flex flex-wrap gap-4">
              {!chief ? (
                <button
                  onClick={createChief}
                  disabled={loading}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
                >
                  <FaSave />
                  {loading ? "Creating..." : "Create Message"}
                </button>
              ) : (
                <>
                  <button
                    onClick={updateChief}
                    disabled={loading}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
                  >
                    <FaSave />
                    {loading ? "Updating..." : "Update Message"}
                  </button>

                  <button
                    onClick={deleteChief}
                    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
                  >
                    <FaTrash />
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* Information Box */}

            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h3 className="font-semibold text-blue-700 mb-2">Information</h3>

              <ul className="text-sm text-gray-700 space-y-2 list-disc pl-5">
                <li>Only one Campus Chief Message can be stored.</li>
                <li>You can update the existing message anytime.</li>
                <li>
                  Uploading a new image replaces the old Cloudinary image.
                </li>
                <li>
                  Deleting removes both the database record and the Cloudinary
                  image.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
