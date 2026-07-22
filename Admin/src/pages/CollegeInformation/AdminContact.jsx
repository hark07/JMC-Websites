import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

import {
  FaEnvelope,
  FaTrash,
  FaEye,
  FaCheck,
  FaSearch,
  FaTimes,
  FaInbox,
} from "react-icons/fa";

const AdminContact = () => {
  // ==========================================
  // State
  // ==========================================

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  // ==========================================
  // Tailwind Classes
  // ==========================================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-4 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500";

  const actionButton =
    "flex h-10 w-10 items-center justify-center rounded-lg text-white transition";

  const tableHeader =
    "px-5 py-4 text-left text-sm font-semibold uppercase tracking-wide text-slate-700";

  // ==========================================
  // Load Contacts
  // ==========================================

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);

      const res = await api.get("/contacts");

      setContacts(res.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load contact messages",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Statistics
  // ==========================================

  const totalMessages = contacts.length;

  const unreadMessages = contacts.filter((item) => !item.isRead).length;

  const readMessages = contacts.filter((item) => item.isRead).length;

  // ==========================================
  // Search
  // ==========================================

  const filteredContacts = useMemo(() => {
    const keyword = search.toLowerCase();

    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(keyword) ||
        item.email.toLowerCase().includes(keyword) ||
        item.subject.toLowerCase().includes(keyword),
    );
  }, [contacts, search]);

  // ==========================================
  // Mark As Read
  // ==========================================

  const markRead = async (id) => {
    try {
      await api.put(`/contacts/${id}`);

      toast.success("Message marked as read");

      fetchContacts();

      if (selected && selected._id === id) {
        setSelected({
          ...selected,
          isRead: true,
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update message");
    }
  };

  // ==========================================
  // Delete Message
  // ==========================================

  const deleteMessage = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this message?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/contacts/${id}`);

      toast.success("Message deleted successfully");

      if (selected?._id === id) {
        setSelected(null);
      }

      fetchContacts();
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
              <FaEnvelope className="text-3xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-800">
                Contact Messages
              </h1>

              <p className="mt-2 text-slate-500">
                Manage enquiries received from your website.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center shadow-sm">
              <p className="text-sm text-slate-500">Total</p>

              <h3 className="mt-1 text-2xl font-bold text-slate-800">
                {totalMessages}
              </h3>
            </div>

            <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-4 text-center shadow-sm">
              <p className="text-sm text-red-600">Unread</p>

              <h3 className="mt-1 text-2xl font-bold text-red-700">
                {unreadMessages}
              </h3>
            </div>

            <div className="rounded-2xl border border-green-200 bg-green-50 px-6 py-4 text-center shadow-sm">
              <p className="text-sm text-green-600">Read</p>

              <h3 className="mt-1 text-2xl font-bold text-green-700">
                {readMessages}
              </h3>
            </div>
          </div>
        </div>

        {/* ==========================================
            Search
        ========================================== */}

        <div className="relative mb-8 max-w-xl">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* ==========================================
            Table Card
        ========================================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          {/* ==========================================
              Table Content
          ========================================== */}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

              <p className="mt-5 text-slate-500">Loading contact messages...</p>
            </div>
          ) : filteredContacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <FaInbox className="mb-5 text-6xl text-slate-300" />

              <h3 className="text-2xl font-bold text-slate-700">
                No Messages Found
              </h3>

              <p className="mt-2 text-slate-500">
                There are no contact messages to display.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b border-slate-200 bg-slate-100">
                  <tr>
                    <th className={tableHeader}>Name</th>

                    <th className={tableHeader}>Email</th>

                    <th className={tableHeader}>Subject</th>

                    <th className={tableHeader}>Status</th>

                    <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-700">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredContacts.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`border-b border-slate-100 transition hover:bg-slate-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50/40"
                      }`}
                    >
                      {/* Name */}

                      <td className="px-5 py-5">
                        <div className="font-semibold text-slate-800">
                          {item.name}
                        </div>
                      </td>

                      {/* Email */}

                      <td className="px-5 py-5 text-slate-600">{item.email}</td>

                      {/* Subject */}

                      <td className="px-5 py-5">
                        <div className="max-w-xs truncate text-slate-700">
                          {item.subject}
                        </div>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-5">
                        {item.isRead ? (
                          <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-sm font-semibold text-green-700">
                            Read
                          </span>
                        ) : (
                          <span className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
                            Unread
                          </span>
                        )}
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-5">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => setSelected(item)}
                            className={`${actionButton} bg-blue-600 hover:bg-blue-700`}
                          >
                            <FaEye />
                          </button>

                          {!item.isRead && (
                            <button
                              onClick={() => markRead(item._id)}
                              className={`${actionButton} bg-green-600 hover:bg-green-700`}
                            >
                              <FaCheck />
                            </button>
                          )}

                          <button
                            onClick={() => deleteMessage(item._id)}
                            className={`${actionButton} bg-red-600 hover:bg-red-700`}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* ==========================================
            Message Details Modal
        ========================================== */}

        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">
              {/* Modal Header */}

              <div className="flex items-center justify-between border-b border-slate-200 px-8 py-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  Message Details
                </h2>

                <button
                  onClick={() => setSelected(null)}
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-red-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Modal Body */}

              <div className="space-y-6 p-8">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Name
                    </p>

                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      {selected.name}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Email
                    </p>

                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 break-all text-slate-700">
                      {selected.email}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Subject
                    </p>

                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      {selected.subject}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Message
                    </p>

                    <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 leading-7 text-slate-700">
                      {selected.message}
                    </div>
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Status
                    </p>

                    {selected.isRead ? (
                      <span className="inline-flex rounded-full border border-green-200 bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
                        Read
                      </span>
                    ) : (
                      <span className="inline-flex rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700">
                        Unread
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="mb-1 text-sm font-semibold text-slate-500">
                      Received On
                    </p>

                    <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                      {new Date(selected.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer */}

                <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 pt-6">
                  {!selected.isRead && (
                    <button
                      onClick={() => markRead(selected._id)}
                      className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                      <FaCheck />
                      Mark as Read
                    </button>
                  )}

                  <button
                    onClick={() => setSelected(null)}
                    className="flex items-center gap-2 rounded-xl bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                  >
                    <FaTimes />
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
