import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaGraduationCap,
} from "react-icons/fa";

import PermissionGuard from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../constants/permissions";

const ProgramManagement = () => {
  // ===============================
  // State
  // ===============================

  const [programs, setPrograms] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    code: "",
    title: "",
    slug: "",
    duration: "",
    eligibility: "",
    seats: "",
    affiliation: "",
    description: "",
    objectives: "",
  });

  // ===============================
  // Reusable Tailwind Classes
  // ===============================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const textareaClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 resize-none outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const primaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70";

  const secondaryButton =
    "flex items-center justify-center gap-2 rounded-xl bg-slate-500 px-6 py-3 font-semibold text-white transition hover:bg-slate-600";

  const editButton =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700";

  const deleteButton =
    "flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white transition hover:bg-red-700";

  const tableHeader =
    "px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700";

  // ===============================
  // Load Programs
  // ===============================

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await api.get("/programs");

      setPrograms(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load programs.");
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
      code: "",
      title: "",
      slug: "",
      duration: "",
      eligibility: "",
      seats: "",
      affiliation: "",
      description: "",
      objectives: "",
    });

    setEditId(null);
  };

  // ===============================
  // Create / Update Program
  // ===============================

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = {
        ...form,
        objectives: form.objectives
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editId) {
        await api.put(`/programs/${editId}`, data);

        toast.success("Program updated successfully.");
      } else {
        await api.post("/programs", data);

        toast.success("Program added successfully.");
      }

      resetForm();
      fetchPrograms();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // ===============================
  // Edit Program
  // ===============================

  const editProgram = (program) => {
    setEditId(program._id);

    setForm({
      code: program.code,
      title: program.title,
      slug: program.slug,
      duration: program.duration,
      eligibility: program.eligibility,
      seats: program.seats,
      affiliation: program.affiliation,
      description: program.description,
      objectives: program.objectives.join(", "),
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // Delete Program
  // ===============================

  const deleteProgram = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this program?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/programs/${id}`);

      toast.success("Program deleted successfully.");

      if (editId === id) {
        resetForm();
      }

      fetchPrograms();
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
      {/* Page Header */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800 md:text-3xl">
              <FaGraduationCap className="text-blue-600" />
              Program Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage academic programs from one place.
            </p>
          </div>

          <div className="inline-flex w-fit rounded-full bg-blue-100 px-5 py-2 font-semibold text-blue-700">
            {programs.length} Programs
          </div>
        </div>
      </div>

      {/* Form */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-slate-700">
          {editId ? "Update Program" : "Add New Program"}
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {[
            "code",
            "title",
            "slug",
            "duration",
            "eligibility",
            "seats",
            "affiliation",
          ].map((field) => (
            <div key={field}>
              <label className="mb-2 block font-medium capitalize text-slate-700">
                {field}
              </label>

              <input
                type="text"
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                className={inputClass}
              />
            </div>
          ))}

          {/* Description */}

          <div className="lg:col-span-2">
            <label className="mb-2 block font-medium text-slate-700">
              Description
            </label>

            <textarea
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter program description..."
              className={textareaClass}
            />
          </div>

          {/* Objectives */}

          <div className="lg:col-span-2">
            <label className="mb-2 block font-medium text-slate-700">
              Objectives
            </label>

            <textarea
              rows={4}
              name="objectives"
              value={form.objectives}
              onChange={handleChange}
              placeholder="Objective 1, Objective 2, Objective 3"
              className={textareaClass}
            />

            <p className="mt-2 text-sm text-slate-500">
              Separate multiple objectives with commas (,).
            </p>
          </div>

          {/* Buttons */}

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PermissionGuard
                permission={
                  editId
                    ? PERMISSIONS.PROGRAM_UPDATE
                    : PERMISSIONS.PROGRAM_CREATE
                }
              >
                <button
                  type="submit"
                  disabled={loading}
                  className={primaryButton}
                >
                  <FaPlus />
                  {loading
                    ? "Saving..."
                    : editId
                      ? "Update Program"
                      : "Add Program"}
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

      {/* Programs List */}

      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="flex flex-col gap-3 border-b bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">
              All Programs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage available academic programs.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {programs.length} Programs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className={tableHeader}>Code</th>
                <th className={tableHeader}>Title</th>
                <th className={tableHeader}>Duration</th>
                <th className={tableHeader}>Eligibility</th>
                <th className={tableHeader}>Seats</th>
                <th className={tableHeader}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {programs.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FaGraduationCap className="text-5xl text-slate-300" />

                      <p className="text-lg font-medium">No programs found</p>

                      <p className="text-sm text-slate-400">
                        Add your first academic program using the form above.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                programs.map((program, index) => (
                  <tr
                    key={program._id}
                    className={`border-t transition hover:bg-slate-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    {/* Code */}

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                        {program.code}
                      </span>
                    </td>

                    {/* Title */}

                    <td className="px-5 py-4">
                      <div className="font-semibold text-slate-800">
                        {program.title}
                      </div>

                      <div className="mt-1 text-sm text-slate-500">
                        {program.slug}
                      </div>
                    </td>

                    {/* Duration */}

                    <td className="px-5 py-4 text-slate-600">
                      {program.duration}
                    </td>

                    {/* Eligibility */}

                    <td className="px-5 py-4 text-slate-600">
                      {program.eligibility}
                    </td>

                    {/* Seats */}

                    <td className="px-5 py-4">
                      <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        {program.seats}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-3">
                        <PermissionGuard
                          permission={PERMISSIONS.PROGRAM_UPDATE}
                        >
                          <button
                            onClick={() => editProgram(program)}
                            className={editButton}
                            title="Edit Program"
                          >
                            <FaEdit />
                          </button>
                        </PermissionGuard>

                        <PermissionGuard
                          permission={PERMISSIONS.PROGRAM_DELETE}
                        >
                          <button
                            onClick={() => deleteProgram(program._id)}
                            className={deleteButton}
                            title="Delete Program"
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
      </div>
    </div>
  );
};

export default ProgramManagement;
