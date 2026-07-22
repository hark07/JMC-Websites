import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaNewspaper } from "react-icons/fa";

import PermissionGuard from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../constants/permissions";

const NewsManagement = () => {
  // ===============================
  // State
  // ===============================

  const [news, setNews] = useState([]);
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
  });

  // ===============================
  // Tailwind Classes
  // ===============================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const primaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed";

  const secondaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-slate-500 px-6 py-3 font-semibold text-white transition hover:bg-slate-600";

  const editButton =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700";

  const deleteButton =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700";

  const tableHeader =
    "px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700";

  // ===============================
  // Load News
  // ===============================

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);

      const res = await api.get("/news");

      setNews(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load news.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Handle Input
  // ===============================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ===============================
  // Reset Form
  // ===============================

  const resetForm = () => {
    setForm({
      title: "",
      date: "",
    });

    setEditId(null);
  };

  // ===============================
  // Submit
  // ===============================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.date.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/news/${editId}`, form);

        toast.success("News updated successfully.");
      } else {
        await api.post("/news", form);

        toast.success("News added successfully.");
      }

      resetForm();
      fetchNews();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Edit News
  // ===============================

  const editNews = (item) => {
    setEditId(item._id);

    setForm({
      title: item.title,
      date: item.date,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // Delete News
  // ===============================

  const deleteNews = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/news/${id}`);

      toast.success("News deleted successfully.");

      if (editId === id) {
        resetForm();
      }

      fetchNews();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  // ===============================
  // UI
  // ===============================

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800 md:text-3xl">
              <FaNewspaper className="text-blue-600" />
              News Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add, update, and manage campus news.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {news.length} News
          </span>
        </div>
      </div>

      {/* Form */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-slate-700">
          {editId ? "Update News" : "Add New News"}
        </h2>

        <form onSubmit={submitHandler} className="space-y-6">
          {/* News Title */}

          <div>
            <label className={labelClass}>News Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter news title"
              className={inputClass}
            />
          </div>

          {/* Date */}

          <div>
            <label className={labelClass}>Date</label>

            <input
              type="text"
              name="date"
              value={form.date}
              onChange={handleChange}
              placeholder="June 16, 2026"
              className={inputClass}
            />
          </div>
          {/* Action Buttons */}

          <div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <PermissionGuard
                permission={
                  editId ? PERMISSIONS.NEWS_UPDATE : PERMISSIONS.NEWS_CREATE
                }
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={primaryButton}
                >
                  <FaPlus />

                  {loading ? "Saving..." : editId ? "Update News" : "Add News"}
                </button>
              </PermissionGuard>

              {editId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className={secondaryButton}
                >
                  <FaTimes />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* News List */}

      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="flex flex-col gap-3 border-b bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">All News</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage all published news.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {news.length} News
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-lg font-medium text-slate-500">
            Loading news...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className={tableHeader}>Title</th>

                  <th className={tableHeader}>Date</th>

                  <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {news.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FaNewspaper className="text-5xl text-slate-300" />

                        <p className="text-lg font-medium">No news found</p>

                        <p className="text-sm text-slate-400">
                          Add your first news article using the form above.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  news.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-t transition hover:bg-slate-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      {/* Title */}

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">
                          {item.title}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                          {item.date}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <PermissionGuard permission={PERMISSIONS.NEWS_UPDATE}>
                            <button
                              onClick={() => editNews(item)}
                              className={editButton}
                              title="Edit News"
                            >
                              <FaEdit />
                            </button>
                          </PermissionGuard>

                          <PermissionGuard permission={PERMISSIONS.NEWS_DELETE}>
                            <button
                              onClick={() => deleteNews(item._id)}
                              className={deleteButton}
                              title="Delete News"
                            >
                              <FaTrash />
                            </button>
                          </PermissionGuard>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsManagement;
