import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilePdf, FaCalendarAlt, FaBullhorn } from "react-icons/fa";

import api from "../api/axios";

// ================= Animation =================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// ================= Component =================

function Notice() {
  const [notices, setNotices] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Pagination
  const noticesPerPage = 10;

  // ================= Fetch Notices =================

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      setLoading(true);

      const res = await api.get("/notices");

      if (res.data.success) {
        setNotices(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= Search + Sort =================

  const filteredNotices = useMemo(() => {
    return notices

      .filter((notice) =>
        notice.title?.toLowerCase().includes(search.toLowerCase()),
      )

      .sort(
        (a, b) =>
          new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date),
      );
  }, [notices, search]);

  // ================= Pagination =================

  const totalPages = Math.ceil(filteredNotices.length / noticesPerPage);

  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * noticesPerPage,

    currentPage * noticesPerPage,
  );

  // Reset page after search

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [currentPage, totalPages]);

  // ================= Loading =================

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-blue-700">Loading Notices...</h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen overflow-hidden">
      {/* ================= HERO ================= */}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <FaBullhorn className="mx-auto text-7xl text-yellow-400 mb-6" />
          </motion.div>

          <h1 className="text-5xl font-bold">Campus Notices</h1>

          <p className="mt-5 text-xl text-gray-200">
            Latest campus announcements and official notices.
          </p>
        </div>
      </motion.section>

      {/* ================= SEARCH ================= */}

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="relative max-w-xl mx-auto">
          <FaSearch className="absolute left-5 top-5 text-gray-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              setCurrentPage(1);
            }}
            placeholder="Search notices..."
            className="w-full pl-14 pr-5 py-4 rounded-xl border shadow focus:ring-2 focus:ring-blue-600 outline-none"
          />
        </div>
      </section>

      {/* ================= NOTICE LIST ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {currentNotices.length > 0 ? (
            currentNotices.map((notice) => (
              <motion.div
                key={notice._id || notice.id}
                variants={fadeUp}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-3 mb-4">
                      {notice.category && (
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                          {notice.category}
                        </span>
                      )}

                      {notice.important && (
                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm">
                          Important
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      {notice.title}
                    </h2>

                    {notice.description && (
                      <p className="text-gray-600 mb-4">{notice.description}</p>
                    )}

                    <div className="flex items-center gap-2 text-gray-500">
                      <FaCalendarAlt />

                      {new Date(
                        notice.createdAt || notice.date,
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  {notice.file && (
                    <a
                      href={`http://localhost:5000/api/notices/download/${notice._id}`}
                      className="bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-xl flex items-center gap-3 h-fit"
                    >
                      <FaFilePdf />
                      Download PDF
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow p-16 text-center">
              <FaBullhorn className="mx-auto text-6xl text-gray-300" />

              <h2 className="text-3xl font-bold mt-5">No Notices Found</h2>
            </div>
          )}
        </motion.div>

        {/* ================= PAGINATION ================= */}

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-12 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white disabled:bg-gray-300"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-11 h-11 rounded-xl font-semibold ${
                  currentPage === index + 1
                    ? "bg-blue-700 text-white"
                    : "bg-white border"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-5 py-3 rounded-xl bg-blue-600 text-white disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Notice;
