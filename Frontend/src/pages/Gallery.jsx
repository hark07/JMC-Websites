import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaImages, FaSearchPlus, FaTimes, FaSpinner } from "react-icons/fa";

import api from "../api/axios";

const IMAGE_URL = "https://jmc-websites.onrender.com";

// ================= Animation =================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

function Gallery() {
  const [galleries, setGalleries] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(null);

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);

  const imagesPerPage = 40;

  // ================= Fetch =================

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await api.get("/gallery");

      if (res.data.success) {
        setGalleries(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= Image URL =================

  const getImageUrl = (image) => {
    if (!image) return "";

    if (image.startsWith("http")) {
      return image;
    }

    return `${IMAGE_URL}${image}`;
  };

  // ================= Pagination =================

  const totalPages = Math.ceil(galleries.length / imagesPerPage);

  const currentImages = galleries.slice(
    (currentPage - 1) * imagesPerPage,

    currentPage * imagesPerPage,
  );

  // ================= Loading =================

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
        <FaSpinner className="text-5xl text-blue-600 animate-spin" />

        <h2 className="mt-5 text-2xl font-semibold text-gray-700">
          Loading Gallery...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      {/* HERO */}

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
            <FaImages className="mx-auto text-7xl text-yellow-400 mb-6" />
          </motion.div>

          <h1 className="text-5xl font-bold mb-4">Campus Gallery</h1>

          <p className="text-lg text-gray-200 max-w-3xl mx-auto">
            Explore memorable moments from campus life, seminars, workshops,
            sports, cultural programs and academic activities.
          </p>
        </div>
      </motion.section>

      {/* GALLERY */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        {galleries.length === 0 ? (
          <div className="text-center py-20">
            <FaImages className="mx-auto text-7xl text-gray-300 mb-5" />

            <h2 className="text-3xl font-bold text-gray-700">
              No Images Found
            </h2>

            <p className="text-gray-500 mt-2">Gallery is currently empty.</p>
          </div>
        ) : (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {currentImages.map((gallery) => (
              <motion.div
                key={gallery._id}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                }}
                className="group overflow-hidden rounded-2xl bg-white shadow-lg cursor-pointer"
                onClick={() => setSelectedImage(getImageUrl(gallery.image))}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={getImageUrl(gallery.image)}
                    alt="Gallery"
                    className="h-72 w-full object-cover transition duration-500 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center">
                    <FaSearchPlus className="text-white text-4xl mb-3" />

                    <p className="text-white font-semibold">View Image</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pb-20 flex-wrap">
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

      {/* LIGHTBOX */}

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-5"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white text-4xl"
            >
              <FaTimes />
            </button>

            <motion.img
              src={selectedImage}
              alt="Gallery"
              initial={{
                scale: 0.8,
              }}
              animate={{
                scale: 1,
              }}
              className="max-h-[90vh] max-w-[95vw] rounded-xl shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Gallery;
