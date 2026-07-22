import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaTimes, FaBullhorn } from "react-icons/fa";

import PermissionGuard from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../constants/permissions";

const Highlight = () => {
  // ==========================
  // STATE
  // ==========================

  const [highlights, setHighlights] = useState([]);
  const [title, setTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ==========================
  // LOAD DATA
  // ==========================

  useEffect(() => {
    fetchHighlights();
  }, []);

  // ==========================
  // GET ALL HIGHLIGHTS
  // ==========================

  const fetchHighlights = async () => {
    try {
      const res = await api.get("/highlights");

      setHighlights(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load highlights");
    }
  };

  // ==========================
  // ADD OR UPDATE
  // ==========================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Highlight title is required.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/highlights/${editId}`, {
          title,
        });

        toast.success("Highlight updated successfully.");
      } else {
        await api.post("/highlights", {
          title,
        });

        toast.success("Highlight added successfully.");
      }

      setTitle("");
      setEditId(null);

      fetchHighlights();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  // ==========================
  // EDIT
  // ==========================

  const editHighlight = (item) => {
    setEditId(item._id);
    setTitle(item.title);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // CANCEL EDIT
  // ==========================

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
  };

  // ==========================
  // DELETE
  // ==========================

  const deleteHighlight = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this highlight?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/highlights/${id}`);

      toast.success("Highlight deleted successfully.");

      fetchHighlights();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete highlight.");
    }
  };

  // ==========================
  // UI
  // ==========================

  return (
    <div className="space-y-6">
      {/* Page Header */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-2xl font-bold text-slate-800 sm:text-3xl">
            <FaBullhorn className="text-blue-600" />
            Highlight Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Add, update and delete website highlights.
          </p>
        </div>
      </div>

      {/* Form Card */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-5 text-lg font-semibold text-slate-700">
          {editId ? "Update Highlight" : "Add New Highlight"}
        </h2>

        <form
          onSubmit={submitHandler}
          className="flex flex-col gap-4 lg:flex-row"
        >
          <input
            type="text"
            placeholder="Enter highlight title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <PermissionGuard
              permission={
                editId
                  ? PERMISSIONS.HIGHLIGHT_UPDATE
                  : PERMISSIONS.HIGHLIGHT_CREATE
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
                    ? "Update Highlight"
                    : "Add Highlight"}
              </button>
            </PermissionGuard>

            {editId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center justify-center gap-2 rounded-lg bg-gray-500 px-6 py-3 font-medium text-white transition hover:bg-gray-600"
              >
                <FaTimes />
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Highlight List */}

      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="border-b bg-slate-50 px-6 py-4">
          <h2 className="text-lg font-semibold text-slate-700">
            All Highlights
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  S.N.
                </th>

                <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700">
                  Highlight
                </th>

                <th className="px-4 py-4 text-center text-sm font-semibold text-slate-700">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {highlights.length > 0 ? (
                highlights.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-slate-50 transition"
                  >
                    <td className="px-4 py-4 font-medium">{index + 1}</td>

                    <td className="px-4 py-4">{item.title}</td>

                    <td className="px-4 py-4">
                      <div className="flex justify-center gap-3">
                        <PermissionGuard
                          permission={PERMISSIONS.HIGHLIGHT_UPDATE}
                        >
                          <button
                            onClick={() => editHighlight(item)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white transition hover:bg-emerald-600"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                        </PermissionGuard>

                        <PermissionGuard
                          permission={PERMISSIONS.HIGHLIGHT_DELETE}
                        >
                          <button
                            onClick={() => deleteHighlight(item._id)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-white transition hover:bg-red-600"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </PermissionGuard>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <FaBullhorn className="text-5xl text-gray-300" />

                      <p className="text-lg font-medium">No highlights found</p>

                      <p className="text-sm text-gray-400">
                        Add your first highlight using the form above.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Highlight;
