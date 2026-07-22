import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

import PermissionGuard from "../../components/PermissionGuard";
import { PERMISSIONS } from "../../constants/permissions";

const EventManagement = () => {
  // ===============================
  // State
  // ===============================

  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    date: "",
    year: "",
    time: "",
    location: "",
  });

  // ===============================
  // Reusable Tailwind Classes
  // ===============================

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

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
  // Load Events
  // ===============================

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/events");

      setEvents(res.data.data || []);
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to load events.");
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
      year: "",
      time: "",
      location: "",
    });

    setEditId(null);
  };

  // ===============================
  // Create / Update Event
  // ===============================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.date.trim() ||
      !form.year.trim() ||
      !form.time.trim() ||
      !form.location.trim()
    ) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      if (editId) {
        await api.put(`/events/${editId}`, form);

        toast.success("Event updated successfully.");
      } else {
        await api.post("/events", form);

        toast.success("Event added successfully.");
      }

      resetForm();
      fetchEvents();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Edit Event
  // ===============================

  const editEvent = (event) => {
    setEditId(event._id);

    setForm({
      title: event.title,
      date: event.date,
      year: event.year,
      time: event.time,
      location: event.location,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ===============================
  // Delete Event
  // ===============================

  const deleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`);

      toast.success("Event deleted successfully.");

      if (editId === id) {
        resetForm();
      }

      fetchEvents();
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
              <FaCalendarAlt className="text-blue-600" />
              Event Management
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add, update, and manage campus events.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {events.length} Events
          </span>
        </div>
      </div>

      {/* Form */}

      <div className="rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-slate-700">
          {editId ? "Update Event" : "Add New Event"}
        </h2>

        <form
          onSubmit={submitHandler}
          className="grid grid-cols-1 gap-6 lg:grid-cols-2"
        >
          {/* Event Title */}

          <div className="lg:col-span-2">
            <label className={labelClass}>Event Title</label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
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
              placeholder="August 24"
              className={inputClass}
            />
          </div>

          {/* Year */}

          <div>
            <label className={labelClass}>Year</label>

            <input
              type="text"
              name="year"
              value={form.year}
              onChange={handleChange}
              placeholder="2026"
              className={inputClass}
            />
          </div>

          {/* Time */}

          <div>
            <label className={labelClass}>Time</label>

            <input
              type="text"
              name="time"
              value={form.time}
              onChange={handleChange}
              placeholder="10:00 AM"
              className={inputClass}
            />
          </div>

          {/* Location */}

          <div>
            <label className={labelClass}>Location</label>

            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Campus Hall"
              className={inputClass}
            />
          </div>

          {/* Action Buttons */}

          <div className="lg:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PermissionGuard
                permission={
                  editId ? PERMISSIONS.EVENT_UPDATE : PERMISSIONS.EVENT_CREATE
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
                      ? "Update Event"
                      : "Add Event"}
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

      {/* Event List */}

      <div className="overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="flex flex-col gap-3 border-b bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-700">All Events</h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage all campus events.
            </p>
          </div>

          <span className="w-fit rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            {events.length} Events
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-lg font-medium text-slate-500">
            Loading events...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className={tableHeader}>Title</th>

                  <th className={tableHeader}>Date</th>

                  <th className={tableHeader}>Year</th>

                  <th className={tableHeader}>Time</th>

                  <th className={tableHeader}>Location</th>

                  <th className="px-5 py-4 text-center text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {events.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <FaCalendarAlt className="text-5xl text-slate-300" />

                        <p className="text-lg font-medium">No events found</p>

                        <p className="text-sm text-slate-400">
                          Add your first event using the form above.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  events.map((event, index) => (
                    <tr
                      key={event._id}
                      className={`border-t transition hover:bg-slate-50 ${
                        index % 2 === 0 ? "bg-white" : "bg-slate-50"
                      }`}
                    >
                      {/* Title */}

                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">
                          {event.title}
                        </div>
                      </td>

                      {/* Date */}

                      <td className="px-5 py-4 text-slate-600">{event.date}</td>

                      {/* Year */}

                      <td className="px-5 py-4 text-slate-600">{event.year}</td>

                      {/* Time */}

                      <td className="px-5 py-4 text-slate-600">{event.time}</td>

                      {/* Location */}

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-700">
                          {event.location}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-center gap-3">
                          <PermissionGuard
                            permission={PERMISSIONS.EVENT_UPDATE}
                          >
                            <button
                              onClick={() => editEvent(event)}
                              className={editButton}
                              title="Edit Event"
                            >
                              <FaEdit />
                            </button>
                          </PermissionGuard>

                          <PermissionGuard
                            permission={PERMISSIONS.EVENT_DELETE}
                          >
                            <button
                              onClick={() => deleteEvent(event._id)}
                              className={deleteButton}
                              title="Delete Event"
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

export default EventManagement;
