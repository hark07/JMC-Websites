import { useEffect, useState } from "react";
import api from "../api/axios";

import {
  FaUniversity,
  FaUsers,
  FaBookOpen,
  FaAward,
  FaBullseye,
  FaEye,
} from "react-icons/fa";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// =======================
// Animation Variants
// =======================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

function About() {
  const [about, setAbout] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      setLoading(true);

      const res = await api.get("/about");

      if (res.data.success && res.data.data.length > 0) {
        setAbout(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl font-bold">Loading...</h2>
      </div>
    );
  }

  if (!about) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2>No About Data Found</h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* ================= HERO ================= */}

      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-16 sm:py-20 lg:py-24"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight mb-6"
          >
            About Janjyoti Multiple Campus
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.5,
              duration: 1,
            }}
            className="text-base sm:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto leading-8"
          >
            Providing quality education with excellence, innovation, leadership,
            research, and lifelong learning opportunities for every student.
          </motion.p>
        </div>
      </motion.section>

      {/* ================= ABOUT CAMPUS ================= */}

      <section className="max-w-7xl mx-auto px-5 sm:px-6 py-14 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.img
              src={about.campusImage}
              alt={about.campusTitle}
              className="rounded-2xl shadow-2xl w-full h-[260px] sm:h-[380px] lg:h-[500px] object-cover"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              whileHover={{ scale: 1.03 }}
            />
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6">
              {about.campusTitle}
            </h2>

            <p className="text-gray-600 leading-8 text-justify mb-5">
              {about.campusDescription1}
            </p>

            <p className="text-gray-600 leading-8 text-justify">
              {about.campusDescription2}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= VISION & MISSION ================= */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-5 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
        >
          {/* ================= Vision ================= */}

          <motion.div
            variants={fadeLeft}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
            className="bg-blue-50 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <FaEye className="text-5xl sm:text-6xl text-blue-700 mb-6" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-7 sm:leading-8 text-justify">
              {about.vision}
            </p>
          </motion.div>

          {/* ================= Mission ================= */}

          <motion.div
            variants={fadeRight}
            whileHover={{
              y: -10,
              scale: 1.02,
            }}
            transition={{ duration: 0.3 }}
            className="bg-yellow-50 rounded-2xl shadow-lg p-6 sm:p-8 lg:p-10"
          >
            <motion.div
              animate={{
                rotate: [0, -10, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
            >
              <FaBullseye className="text-5xl sm:text-6xl text-yellow-500 mb-6" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-5">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-7 sm:leading-8 text-justify">
              {about.mission}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}

      <section className="py-16 sm:py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          {/* Section Heading */}

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 lg:mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              Why Choose Us?
            </h2>

            <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-3xl mx-auto leading-7 sm:leading-8">
              We provide a student-centered learning environment with
              experienced faculty, modern infrastructure, and practical
              education to prepare students for successful careers.
            </p>
          </motion.div>

          {/* Cards */}

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {/* Card 1 */}

            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <FaUniversity className="text-5xl sm:text-6xl text-blue-700 mx-auto mb-5" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Modern Campus
              </h3>

              <p className="text-gray-600 leading-7">
                Well-equipped classrooms, laboratories, library, conference
                halls, and peaceful learning spaces.
              </p>
            </motion.div>

            {/* Card 2 */}

            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FaUsers className="text-5xl sm:text-6xl text-green-600 mx-auto mb-5" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Expert Faculty
              </h3>

              <p className="text-gray-600 leading-7">
                Dedicated and experienced teachers committed to academic
                excellence and student success.
              </p>
            </motion.div>

            {/* Card 3 */}

            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <FaBookOpen className="text-5xl sm:text-6xl text-red-500 mx-auto mb-5" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Quality Education
              </h3>

              <p className="text-gray-600 leading-7">
                Updated curriculum, practical learning, seminars, workshops, and
                research-based education.
              </p>
            </motion.div>

            {/* Card 4 */}

            <motion.div
              variants={fadeUp}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <FaAward className="text-5xl sm:text-6xl text-yellow-500 mx-auto mb-5" />
              </motion.div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4">
                Career Support
              </h3>

              <p className="text-gray-600 leading-7">
                Internship opportunities, career counseling, entrepreneurship
                training, and placement support.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= CAMPUS CHIEF MESSAGE ================= */}

      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}

            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-1"
            >
              <motion.img
                src={about.chiefImage}
                alt={about.chiefName}
                className="w-full h-[300px] sm:h-[420px] lg:h-[500px] rounded-2xl shadow-2xl object-cover"
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                whileHover={{
                  scale: 1.03,
                }}
              />
            </motion.div>

            {/* Content */}

            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="order-2"
            >
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm sm:text-base mb-5">
                {about.chiefTitle}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6">
                {about.campusTitle}
              </h2>

              <p className="text-gray-600 leading-8 text-justify mb-5">
                {about.chiefMessage1}
              </p>

              <p className="text-gray-600 leading-8 text-justify mb-5">
                {about.chiefMessage2}
              </p>

              <p className="text-gray-600 leading-8 text-justify mb-8">
                {about.chiefMessage3}
              </p>

              <div className="border-l-4 border-blue-700 pl-5">
                <h3 className="text-2xl font-bold text-blue-900">
                  {about.chiefName}
                </h3>

                <p className="text-gray-500 mt-1 text-base sm:text-lg">
                  {about.chiefPosition}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}

      <section className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-16 sm:py-20 lg:py-24">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-5xl mx-auto px-5 sm:px-6 text-center"
        >
          <motion.h2
            initial={{
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-5"
          >
            Ready to Build Your Future?
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: 0.3,
              duration: 0.8,
            }}
            className="text-base sm:text-lg text-gray-700 leading-8 max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            Join Janjyoti Multiple Campus and experience quality education,
            experienced faculty members, practical learning, and excellent
            career opportunities.
          </motion.p>

          <motion.div
            whileHover={{
              scale: 1.08,
              y: -5,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <Link
              to="/admission-form"
              className="
        inline-flex
        items-center
        justify-center
        bg-blue-900
        hover:bg-blue-800
        text-white
        px-8
        sm:px-10
        py-3
        sm:py-4
        rounded-xl
        text-base
        sm:text-lg
        font-semibold
        shadow-xl
        transition-all
        duration-300
        "
            >
              Apply for Admission
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default About;
