import { useState, useEffect } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaFilePdf } from "react-icons/fa";

import { hasPermission } from "../../utils/hasPermission";
import { PERMISSIONS } from "../../constants/permissions";

const DocumentManagement = () => {
  // ===========================================================
  // State
  // ===========================================================

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    file: null,
  });

  // ===========================================================
  // Tailwind Classes
  // ===========================================================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500";

  const textareaClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 resize-none outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-500";

  const fileInputClass =
    "w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-blue-500";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  const primaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60";

  const secondaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-slate-500 px-6 py-3 font-semibold text-white transition hover:bg-slate-600";

  const editButton =
    "flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700";

  const deleteButton =
    "flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700";

  const pdfButton =
    "mt-5 flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-semibold text-white transition hover:bg-red-700";

  const cardClass =
    "overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl";

  // ===========================================================
  // Load Documents
  // ===========================================================

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);

      const res = await api.get("/downloads");

      setDocuments(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================================
  // Form Handlers
  // ===========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    setForm((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  // ===========================================================
  // Submit Document
  // ===========================================================

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);

      if (form.file) {
        formData.append("file", form.file);
      }

      if (editId) {
        await api.put(`/downloads/${editId}`, formData);

        toast.success("Document updated successfully");
      } else {
        await api.post("/downloads", formData);

        toast.success("Document added successfully");
      }

      resetForm();
      loadDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ===========================================================
  // Edit Document
  // ===========================================================

  const editDocument = (item) => {
    setEditId(item._id);

    setForm({
      title: item.title,
      description: item.description,
      category: item.category,
      file: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===========================================================
  // Delete Document
  // ===========================================================

  const deleteDocument = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this document?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/downloads/${id}`);

      toast.success("Document deleted successfully");

      if (editId === id) {
        resetForm();
      }

      loadDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };
  // ===========================================================
  // Reset Form
  // ===========================================================

  const resetForm = () => {
    setEditId(null);

    setForm({
      title: "",
      description: "",
      category: "",
      file: null,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ===========================================================
            Header
        =========================================================== */}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
            Document Management
          </h1>

          <p className="mt-2 text-slate-500">
            Upload and manage PDF documents available for students to download.
          </p>
        </div>

        {/* ===========================================================
            Document Form
        =========================================================== */}

        <div className="mb-10 rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            {editId ? "Update Document" : "Add New Document"}
          </h2>

          <form
            onSubmit={submit}
            className="grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            {/* Title */}

            <div>
              <label className={labelClass}>Document Title</label>

              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter document title"
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
                placeholder="Enter category (Admission, Exam, Scholarship...)"
                className={inputClass}
                required
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
                placeholder="Write a short description..."
                className={textareaClass}
                required
              />
            </div>

            {/* Upload PDF */}

            <div className="lg:col-span-2">
              <label className={labelClass}>Upload PDF Document</label>

              <input
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className={fileInputClass}
              />

              {form.file && (
                <div className="mt-4 flex items-center gap-4 rounded-xl border border-green-200 bg-green-50 p-4">
                  <FaFilePdf className="text-5xl text-red-600" />

                  <div>
                    <p className="font-semibold text-slate-700">
                      Selected Document
                    </p>

                    <p className="text-sm text-slate-500">{form.file.name}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}

            <div className="lg:col-span-2">
              <div className="flex flex-col gap-3 sm:flex-row">
                {((!editId && hasPermission(PERMISSIONS.DOWNLOAD_CREATE)) ||
                  (editId && hasPermission(PERMISSIONS.DOWNLOAD_UPDATE))) && (
                  <button
                    type="submit"
                    disabled={loading}
                    className={primaryButton}
                  >
                    <FaPlus />

                    {loading
                      ? "Saving..."
                      : editId
                        ? "Update Document"
                        : "Add Document"}
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
        {/* ===========================================================
            Document List Header
        =========================================================== */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">All Documents</h2>

          <p className="mt-2 text-slate-500">
            Manage documents available for students.
          </p>
        </div>

        {/* ===========================================================
            Document List
        =========================================================== */}

        {loading ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-lg">
            <p className="text-lg font-medium text-slate-500">
              Loading documents...
            </p>
          </div>
        ) : documents.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-lg">
            <FaFilePdf className="mx-auto mb-6 text-7xl text-red-500" />

            <h3 className="text-2xl font-bold text-slate-700">
              No Documents Found
            </h3>

            <p className="mt-2 text-slate-500">
              Upload your first document for students.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {documents.map((item) => (
              <div key={item._id} className={cardClass}>
                {/* PDF Preview */}

                <div className="flex justify-center border-b bg-red-50 py-8">
                  <FaFilePdf className="text-7xl text-red-600" />
                </div>

                {/* Card Body */}

                <div className="p-6">
                  <h3 className="line-clamp-2 text-center text-xl font-bold text-slate-800">
                    {item.title}
                  </h3>

                  <div className="mt-4 flex justify-center">
                    <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                      {item.category}
                    </span>
                  </div>

                  <p className="mt-5 line-clamp-4 text-center text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>

                  {/* View PDF */}

                  <a
                    href={`https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(item.file)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={pdfButton}
                  >
                    <FaFilePdf />
                    View PDF
                  </a>

                  {/* Action Buttons */}

                  <div className="mt-6 flex gap-3">
                    <button
                      onClick={() => editDocument(item)}
                      className={editButton}
                    >
                      <FaEdit />
                      Edit
                    </button>

                    <button
                      onClick={() => deleteDocument(item._id)}
                      className={deleteButton}
                    >
                      <FaTrash />
                      Delete
                    </button>
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

export default DocumentManagement;
