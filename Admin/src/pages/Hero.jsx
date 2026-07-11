import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaImages } from "react-icons/fa";

import PermissionGuard from "../components/PermissionGuard";
import { PERMISSIONS } from "../constants/permissions";

const Hero = () => {
  // ==========================
  // State
  // ==========================

  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    badge: "",
    title: "",
    subtitle: "",
    image: null,
  });

  const [editId, setEditId] = useState(null);

  // ==========================
  // Load Heroes
  // ==========================

  useEffect(() => {
    fetchHeroes();
  }, []);

  // ==========================
  // Get All Heroes
  // ==========================

  const fetchHeroes = async () => {
    try {
      const response = await api.get("/heroes");
      setHeroes(response.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load heroes.");
    }
  };

  // ==========================
  // Handle Text Input
  // ==========================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ==========================
  // Handle Image
  // ==========================

  const handleImage = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {
    setForm({
      badge: "",
      title: "",
      subtitle: "",
      image: null,
    });

    setEditId(null);
  };

  // ==========================
  // Create / Update Hero
  // ==========================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("badge", form.badge);
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);

      if (form.image) {
        formData.append("image", form.image);
      }

      if (editId) {
        await api.put(`/heroes/${editId}`, formData);

        toast.success("Hero updated successfully.");
      } else {
        await api.post("/heroes", formData);

        toast.success("Hero created successfully.");
      }

      resetForm();
      fetchHeroes();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // ==========================
  // Edit Hero
  // ==========================

  const editHero = (hero) => {
    setEditId(hero._id);

    setForm({
      badge: hero.badge,
      title: hero.title,
      subtitle: hero.subtitle,
      image: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // Delete Hero
  // ==========================

  const deleteHero = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hero?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/heroes/${id}`);

      toast.success("Hero deleted successfully.");

      if (editId === id) {
        resetForm();
      }

      fetchHeroes();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  // ==========================
  // UI
  // ==========================

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-lg md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800 md:text-3xl">
            <FaImages className="text-blue-600" />
            Hero Management
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the homepage hero section.
          </p>
        </div>

        <div className="inline-flex w-fit items-center rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
          {heroes.length} / 1 Hero
        </div>
      </div>

      {/* Hero Form */}

      {heroes.length === 0 || editId ? (
        <div className="rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-slate-700">
            {editId ? "Update Hero" : "Create Hero"}
          </h2>

          <form
            onSubmit={submitHandler}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {/* Badge */}

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Badge
              </label>

              <input
                type="text"
                name="badge"
                value={form.badge}
                onChange={handleChange}
                placeholder="Enter badge"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Title */}

            <div>
              <label className="mb-2 block font-medium text-slate-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter title"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Subtitle */}

            <div className="lg:col-span-2">
              <label className="mb-2 block font-medium text-slate-700">
                Subtitle
              </label>

              <textarea
                rows={4}
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                placeholder="Enter subtitle"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Hero Image */}

            <div className="lg:col-span-2">
              <label className="mb-2 block font-medium text-slate-700">
                Hero Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="w-full rounded-lg border border-gray-300 p-3 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
              />

              {form.image && (
                <div className="mt-5">
                  <img
                    src={URL.createObjectURL(form.image)}
                    alt="Preview"
                    className="h-56 w-full rounded-xl border object-cover lg:w-96"
                  />
                </div>
              )}
            </div>

            {/* Action Buttons */}

            <div className="lg:col-span-2 flex flex-col gap-3 sm:flex-row">
              <PermissionGuard
                permission={
                  editId ? PERMISSIONS.HERO_UPDATE : PERMISSIONS.HERO_CREATE
                }
              >
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <FaPlus />
                  {loading
                    ? "Saving..."
                    : editId
                      ? "Update Hero"
                      : "Create Hero"}
                </button>
              </PermissionGuard>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-3 font-medium text-white transition hover:bg-gray-600"
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-xl border border-yellow-300 bg-yellow-50 p-6 shadow">
          <h2 className="text-xl font-bold text-yellow-700">
            Hero Already Exists
          </h2>

          <p className="mt-2 text-gray-700">
            Only one hero section is allowed.
            <br />
            Delete the existing hero before creating a new one.
          </p>
        </div>
      )}

      {/* Hero List */}

      <div>
        <h2 className="mb-6 text-2xl font-bold text-slate-800">Hero List</h2>
        {heroes.length === 0 ? (
          <div className="rounded-xl bg-white p-12 text-center shadow-lg">
            <FaImages className="mx-auto mb-4 text-6xl text-gray-300" />

            <h3 className="text-2xl font-bold text-slate-700">No Hero Found</h3>

            <p className="mt-2 text-slate-500">
              Create your first hero section using the form above.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {heroes.map((hero) => (
              <div
                key={hero._id}
                className="overflow-hidden rounded-2xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <img
                  src={hero.image}
                  alt={hero.title}
                  className="h-60 w-full object-cover"
                />

                <div className="space-y-4 p-6">
                  <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                    {hero.badge}
                  </span>

                  <h3 className="text-2xl font-bold text-slate-800">
                    {hero.title}
                  </h3>

                  <p className="line-clamp-4 text-sm leading-6 text-slate-600">
                    {hero.subtitle}
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <PermissionGuard permission={PERMISSIONS.HERO_UPDATE}>
                      <button
                        onClick={() => editHero(hero)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-3 text-white transition hover:bg-emerald-700"
                      >
                        <FaEdit />
                        Edit
                      </button>
                    </PermissionGuard>

                    <PermissionGuard permission={PERMISSIONS.HERO_DELETE}>
                      <button
                        onClick={() => deleteHero(hero._id)}
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-white transition hover:bg-red-700"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </PermissionGuard>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
