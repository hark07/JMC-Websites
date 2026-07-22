import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaTrash,
  FaEdit,
  FaTimes,
  FaImage,
  FaCloudUploadAlt,
  FaImages,
} from "react-icons/fa";

const GalleryManagement = () => {
  // ==========================================
  // State
  // ==========================================

  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // ==========================================
  // Tailwind Classes
  // ==========================================

  const primaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700 hover:shadow-lg";

  const editButton =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 transition hover:scale-110";

  const deleteButton =
    "flex h-11 w-11 items-center justify-center rounded-full bg-white text-red-600 transition hover:scale-110";

  // ==========================================
  // Fetch Gallery
  // ==========================================

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);

      const res = await api.get("/gallery");

      setGalleries(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Handle Image
  // ==========================================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // ==========================================
  // Open Add Modal
  // ==========================================

  const openAdd = () => {
    setEditId(null);
    setImage(null);
    setPreview("");
    setShowModal(true);
  };

  // ==========================================
  // Open Edit Modal
  // ==========================================

  const openEdit = (item) => {
    setEditId(item._id);
    setImage(null);
    setPreview(item.image);
    setShowModal(true);
  };

  // ==========================================
  // Close Modal
  // ==========================================

  const closeModal = () => {
    setShowModal(false);
    setEditId(null);
    setImage(null);
    setPreview("");
  };

  // ==========================================
  // Submit
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image && !editId) {
      toast.error("Please select an image");
      return;
    }

    try {
      const formData = new FormData();

      if (image) {
        formData.append("image", image);
      }

      if (editId) {
        await api.put(`/gallery/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Image updated successfully");
      } else {
        await api.post("/gallery", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success("Image uploaded successfully");
      }

      closeModal();
      fetchGallery();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  // ==========================================
  // Delete Image
  // ==========================================

  const deleteImage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this image?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/gallery/${id}`);

      toast.success("Image deleted successfully");

      fetchGallery();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  // ==========================================
  // Component
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* ==========================================
            Header
        ========================================== */}

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg">
              <FaImages className="text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Gallery Management
              </h1>

              <p className="mt-2 text-slate-500">
                Upload and manage gallery images.
              </p>
            </div>
          </div>

          <button onClick={openAdd} className={primaryButton}>
            <FaPlus />
            Add Image
          </button>
        </div>

        {/* ==========================================
            Statistics Card
        ========================================== */}

        <div className="mb-8 w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500">Total Images</p>

              <h2 className="mt-2 text-4xl font-bold text-blue-600">
                {galleries.length}
              </h2>
            </div>

            <div className="rounded-2xl bg-blue-100 p-5">
              <FaImage className="text-3xl text-blue-600" />
            </div>
          </div>
        </div>
        {/* ==========================================
            Gallery Content
        ========================================== */}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

            <p className="mt-5 text-lg text-slate-500">Loading Gallery...</p>
          </div>
        ) : galleries.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white py-20 text-center shadow-lg">
            <FaImage className="mx-auto text-7xl text-slate-300" />

            <h2 className="mt-5 text-2xl font-bold text-slate-700">
              No Images Found
            </h2>

            <p className="mt-2 text-slate-500">
              Upload your first gallery image.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {galleries.map((item) => (
              <div
                key={item._id}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Image */}

                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt="Gallery"
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  {/* Overlay */}

                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/50 opacity-0 transition group-hover:opacity-100">
                    <button
                      onClick={() => openEdit(item)}
                      className={editButton}
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => deleteImage(item._id)}
                      className={deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Card Footer */}

                <div className="p-5">
                  <h3 className="font-semibold text-slate-800">
                    Gallery Image
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Uploaded Campus Image
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ==========================================
            Upload Modal
        ========================================== */}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">
            <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">
              {/* Modal Header */}

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-800">
                  {editId ? "Update Gallery Image" : "Add Gallery Image"}
                </h2>

                <button
                  onClick={closeModal}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Form */}

              <form onSubmit={handleSubmit}>
                <label className="flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-500">
                  <FaCloudUploadAlt className="mb-3 text-5xl text-blue-600" />

                  <p className="font-semibold text-slate-700">
                    Click to upload image
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    JPG, PNG, WEBP supported
                  </p>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
                {/* Image Preview */}

                {preview && (
                  <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-56 w-full object-cover"
                    />
                  </div>
                )}

                {/* Submit Button */}

                <button
                  type="submit"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-semibold text-white shadow-md transition hover:bg-green-700"
                >
                  {editId ? (
                    <>
                      <FaEdit />
                      Update Image
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      Save Image
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
