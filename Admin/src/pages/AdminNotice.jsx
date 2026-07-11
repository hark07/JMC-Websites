import { useEffect, useState } from "react";
import api from "../api/axios";
import { toast } from "react-toastify";

import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilePdf,
  FaBullhorn,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

import { hasPermission } from "./../utils/permission";
import { PERMISSIONS } from "../constants/permissions";

const AdminNotice = () => {
  // ==========================================
  // State
  // ==========================================

  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    date: "",
    important: false,
    file: null,
  });

  // ==========================================
  // Tailwind Classes
  // ==========================================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const textareaClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none resize-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const primaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60";

  const secondaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-slate-500 px-6 py-3 font-semibold text-white transition hover:bg-slate-600";

  const editButton =
    "flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700";

  const deleteButton =
    "flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700";

  const pdfButton =
    "flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 text-white transition hover:bg-red-600";

  // ==========================================
  // Load Notices
  // ==========================================

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notices");

      setNotices(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load notices.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Handle Inputs
  // ==========================================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // ==========================================
  // Submit Notice
  // ==========================================

  const submitNotice = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.category.trim() ||
      !form.description.trim() ||
      !form.date.trim()
    ) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      data.append("title", form.title);
      data.append("category", form.category);
      data.append("description", form.description);
      data.append("date", form.date);
      data.append("important", form.important);

      if (form.file) {
        data.append("file", form.file);
      }

      if (editId) {
        await api.put(`/notices/${editId}`, data);

        toast.success("Notice updated successfully.");
      } else {
        await api.post("/notices", data);

        toast.success("Notice added successfully.");
      }

      resetForm();
      fetchNotices();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Edit Notice
  // ==========================================

  const editNotice = (notice) => {
    setEditId(notice._id);

    setForm({
      title: notice.title,
      category: notice.category,
      description: notice.description,
      date: notice.date,
      important: notice.important,
      file: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================
  // Delete Notice
  // ==========================================

  const deleteNotice = async (id) => {
    if (!window.confirm("Delete this notice?")) return;

    try {
      await api.delete(`/notices/${id}`);

      toast.success("Notice deleted successfully.");

      if (editId === id) {
        resetForm();
      }

      fetchNotices();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Delete failed.");
    }
  };

  // ==========================================
  // Reset Form
  // ==========================================

  const resetForm = () => {
    setEditId(null);

    setForm({
      title: "",
      category: "",
      description: "",
      date: "",
      important: false,
      file: null,
    });
  };

  // ==========================================
  // Search Filter
  // ==========================================

  const filteredNotices = notices.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase()),
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FaBullhorn className="text-2xl" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800 md:text-3xl">
                Notice Management
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Create, update, and manage campus notices.
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {notices.length} Notices
          </span>
        </div>
      </div>
      {/* ==========================================
          Notice Form
      ========================================== */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-slate-700">
          {editId ? "Update Notice" : "Add New Notice"}
        </h2>

        <form
          onSubmit={submitNotice}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Notice Title */}

          <div>
            <label className={labelClass}>Notice Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter notice title"
              className={inputClass}
              required
            />
          </div>

          {/* Category */}

          <div>
            <label className={labelClass}>Category</label>

            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Admission / Exam / Scholarship"
              className={inputClass}
              required
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
              placeholder="July 07, 2026"
              className={inputClass}
              required
            />
          </div>

          {/* PDF Upload */}

          <div>
            <label className={labelClass}>Upload PDF</label>

            <input
              type="file"
              accept="application/pdf"
              onChange={handleFile}
              className={inputClass}
            />
          </div>

          {/* Description */}

          <div className="lg:col-span-2">
            <label className={labelClass}>Description</label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write notice description..."
              className={textareaClass}
              required
            />
          </div>

          {/* Important Notice */}

          <div className="lg:col-span-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <input
                type="checkbox"
                checked={form.important}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    important: e.target.checked,
                  }))
                }
                className="h-5 w-5"
              />

              <span className="font-medium text-slate-700">
                Mark as Important Notice
              </span>
            </label>
          </div>

          {/* Buttons */}

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              {(editId
                ? hasPermission(PERMISSIONS.NOTICE_UPDATE)
                : hasPermission(PERMISSIONS.NOTICE_CREATE)) && (
                <button
                  type="submit"
                  disabled={loading}
                  className={primaryButton}
                >
                  <FaPlus />
                  {loading
                    ? "Saving..."
                    : editId
                      ? "Update Notice"
                      : "Add Notice"}
                </button>
              )}

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

      {/* ==========================================
          Search
      ========================================== */}

      <div className="mt-8 mb-8">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search notices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ==========================================
          Loading
      ========================================== */}

      {loading ? (
        <div className="rounded-xl bg-white py-16 text-center shadow">
          <p className="text-lg font-medium text-slate-500">
            Loading notices...
          </p>
        </div>
      ) : filteredNotices.length === 0 ? (
        <div className="rounded-xl bg-white py-16 text-center shadow">
          <h3 className="text-xl font-semibold text-slate-700">
            No Notices Found
          </h3>

          <p className="mt-2 text-slate-500">
            Add your first notice to get started.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredNotices.map((notice) => (
            <div
              key={notice._id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition hover:shadow-xl"
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
                {/* Notice Details */}

                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                      {notice.category}
                    </span>

                    {notice.important && (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-600">
                        Important
                      </span>
                    )}
                  </div>

                  <h2 className="mb-3 text-2xl font-bold text-slate-800">
                    {notice.title}
                  </h2>

                  <p className="leading-7 text-slate-600">
                    {notice.description}
                  </p>

                  <div className="mt-5">
                    <span className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                      {notice.date}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}

                <div className="flex flex-col gap-3 lg:w-52">
                  <a
                    href={`http://localhost:5000${notice.file}`}
                    target="_blank"
                    rel="noreferrer"
                    className={pdfButton}
                  >
                    <FaFilePdf />
                    View PDF
                  </a>

                  {hasPermission(PERMISSIONS.NOTICE_UPDATE) && (
                    <button
                      onClick={() => editNotice(notice)}
                      className={editButton}
                    >
                      <FaEdit />
                      Edit
                    </button>
                  )}

                  {hasPermission(PERMISSIONS.NOTICE_DELETE) && (
                    <button
                      onClick={() => deleteNotice(notice._id)}
                      className={deleteButton}
                    >
                      <FaTrash />
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotice;
