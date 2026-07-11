import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import {
  FaDownload,
  FaSearch,
  FaSyncAlt,
  FaCloudDownloadAlt,
  FaFilePdf,
} from "react-icons/fa";

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

function Download() {
  const [downloads, setDownloads] = useState([]);

  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");

  const [search, setSearch] = useState("");

  const [keyword, setKeyword] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // ================= Fetch Downloads =================

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setLoading(true);

      const res = await api.get("/downloads");

      if (res.data.success) {
        setDownloads(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= Filter =================

  const filteredDownloads = useMemo(() => {
    return downloads.filter((item) => {
      const matchCategory = category === "" || item.category === category;

      const matchSearch =
        keyword === "" ||
        item.title.toLowerCase().includes(keyword.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [downloads, category, keyword]);

  // ================= Pagination =================

  const totalPages = Math.ceil(filteredDownloads.length / itemsPerPage);

  const paginatedData = filteredDownloads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ================= Search =================

  const handleSearch = () => {
    setKeyword(search);

    setCurrentPage(1);
  };

  const resetFilter = () => {
    setSearch("");

    setKeyword("");

    setCategory("");

    setCurrentPage(1);
  };

  // ================= Loading =================

  if (loading) {
    return (
      <div
        className="
        min-h-screen
        flex
        items-center
        justify-center
      "
      >
        <h1
          className="
          text-2xl
          sm:text-3xl
          font-bold
          text-blue-700
        "
        >
          Loading Downloads...
        </h1>
      </div>
    );
  }

  return (
    <div
      className="
  bg-gray-50
  min-h-screen
  overflow-hidden
"
    >
      {/* ================= HERO ================= */}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="
bg-gradient-to-r
from-blue-900
via-blue-800
to-blue-700
text-white
py-16
sm:py-20
lg:py-24
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-5
sm:px-6
text-center
"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            <FaDownload
              className="
mx-auto
text-5xl
sm:text-6xl
lg:text-7xl
text-yellow-400
mb-6
"
            />
          </motion.div>

          <h1
            className="
text-3xl
sm:text-4xl
lg:text-5xl
font-bold
"
          >
            Downloads
          </h1>

          <p
            className="
mt-5
text-base
sm:text-lg
lg:text-xl
text-gray-200
max-w-3xl
mx-auto
leading-8
"
          >
            Download notices, forms, exam documents and important academic
            resources.
          </p>
        </div>
      </motion.section>

      {/* ================= SEARCH ================= */}

      <section
        className="
py-10
sm:py-14
lg:py-16
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-5
sm:px-6
"
        >
          <div
            className="
bg-white
rounded-2xl
shadow-xl
p-5
sm:p-8
"
          >
            <div
              className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-4
"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title..."
                className="
border
rounded-xl
px-5
py-3
sm:py-4
outline-none
focus:ring-2
focus:ring-blue-500
w-full
"
              />

              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);

                  setCurrentPage(1);
                }}
                className="
border
rounded-xl
px-5
py-3
sm:py-4
w-full
"
              >
                <option value="">All Categories</option>

                {[...new Set(downloads.map((d) => d.category))].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="
bg-green-600
text-white
rounded-xl
flex
justify-center
items-center
gap-2
py-3
sm:py-4
hover:bg-green-700
transition
"
              >
                <FaSearch />
                Search
              </button>

              <button
                onClick={resetFilter}
                className="
bg-red-500
text-white
rounded-xl
flex
justify-center
items-center
gap-2
py-3
sm:py-4
hover:bg-red-600
transition
"
              >
                <FaSyncAlt />
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DOWNLOAD LIST ================= */}

      <section
        className="
pb-14
sm:pb-20
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-5
sm:px-6
"
        >
          <div
            className="
bg-white
rounded-2xl
shadow-xl
overflow-hidden
"
          >
            {/* ================= DESKTOP TABLE ================= */}

            <div
              className="
hidden
md:block
overflow-x-auto
"
            >
              <table className="w-full">
                <thead
                  className="
bg-blue-900
text-white
"
                >
                  <tr>
                    <th
                      className="
p-5
text-left
"
                    >
                      S.N
                    </th>

                    <th
                      className="
p-5
text-left
"
                    >
                      Title
                    </th>

                    <th
                      className="
p-5
text-left
"
                    >
                      Category
                    </th>

                    <th
                      className="
p-5
text-center
"
                    >
                      Download
                    </th>
                  </tr>
                </thead>

                <motion.tbody
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                >
                  {paginatedData.map((item, index) => (
                    <motion.tr
                      key={item._id}
                      variants={fadeUp}
                      className="
border-b
hover:bg-gray-50
transition
"
                    >
                      <td className="p-5">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </td>

                      <td
                        className="
p-5
font-semibold
text-gray-800
"
                      >
                        {item.title}
                      </td>

                      <td className="p-5">
                        <span
                          className="
bg-blue-100
text-blue-700
px-4
py-2
rounded-full
text-sm
"
                        >
                          {item.category}
                        </span>
                      </td>

                      <td
                        className="
p-5
text-center
"
                      >
                        <a
                          href={`http://localhost:5000/api/downloads/file/${item._id}`}
                          className="
inline-flex
items-center
justify-center
w-12
h-12
rounded-full
bg-blue-100
text-blue-700
hover:bg-blue-700
hover:text-white
transition
"
                        >
                          <FaCloudDownloadAlt size={22} />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                </motion.tbody>
              </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}

            <div
              className="
md:hidden
p-5
space-y-5
"
            >
              {paginatedData.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="
border
rounded-2xl
p-5
shadow-sm
hover:shadow-lg
transition
"
                >
                  <div
                    className="
flex
justify-between
items-start
gap-3
"
                  >
                    <div>
                      <p
                        className="
text-sm
text-gray-500
mb-1
"
                      >
                        S.N
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </p>

                      <h3
                        className="
font-bold
text-gray-800
text-lg
"
                      >
                        {item.title}
                      </h3>
                    </div>

                    <FaFilePdf
                      className="
text-red-500
text-3xl
shrink-0
"
                    />
                  </div>

                  <div
                    className="
mt-5
flex
justify-between
items-center
gap-3
"
                  >
                    <span
                      className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
"
                    >
                      {item.category}
                    </span>

                    <a
                      href={`http://localhost:5000/api/downloads/file/${item._id}`}
                      className="
flex
items-center
gap-2
bg-blue-700
text-white
px-4
py-2
rounded-xl
text-sm
"
                    >
                      <FaCloudDownloadAlt />
                      Download
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ================= EMPTY STATE ================= */}

            {filteredDownloads.length === 0 && (
              <div
                className="
py-16
sm:py-20
text-center
"
              >
                <FaFilePdf
                  className="
mx-auto
text-5xl
sm:text-6xl
text-gray-300
"
                />

                <h2
                  className="
text-2xl
sm:text-3xl
font-bold
mt-5
"
                >
                  No Downloads Found
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= PAGINATION ================= */}

      {totalPages > 1 && (
        <div
          className="
flex
justify-center
items-center
gap-2
sm:gap-3
pb-16
sm:pb-20
flex-wrap
px-5
"
        >
          {/* Previous Button */}

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`

px-4
sm:px-5

py-2
sm:py-3

rounded-xl

font-semibold

text-sm
sm:text-base

transition


${
  currentPage === 1
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-blue-700 text-white hover:bg-blue-800"
}

`}
          >
            Previous
          </button>

          {/* Page Numbers */}

          <div
            className="
flex
gap-2
flex-wrap
justify-center
"
          >
            {Array.from(
              {
                length: totalPages,
              },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`


w-10
h-10

sm:w-12
sm:h-12


rounded-xl


font-bold


text-sm
sm:text-base



transition



${
  currentPage === i + 1
    ? "bg-blue-700 text-white"
    : "bg-white border hover:bg-gray-100"
}


`}
                >
                  {i + 1}
                </button>
              ),
            )}
          </div>

          {/* Next Button */}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`


px-4
sm:px-5


py-2
sm:py-3


rounded-xl


font-semibold


text-sm
sm:text-base


transition



${
  currentPage === totalPages
    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
    : "bg-blue-700 text-white hover:bg-blue-800"
}



`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Download;
