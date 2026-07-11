import {
  FaGraduationCap,
  FaClipboardCheck,
  FaFileAlt,
  FaCalendarAlt,
  FaArrowRight,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// ================= ANIMATION =================

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function Admission() {
  const steps = [
    "Fill out the online admission form.",
    "Submit the required documents.",
    "Pay the admission/application fee.",
    "Attend the entrance interview (if applicable).",
    "Verify your documents.",
    "Receive admission confirmation.",
  ];

  const documents = [
    "SEE/SLC Marksheet & Certificate",
    "+2 / Equivalent Marksheet & Certificate",
    "Character Certificate",
    "Migration Certificate (if required)",
    "Citizenship/Birth Certificate Copy",
    "Recent Passport Size Photographs",
  ];

  const eligibility = [
    "Bachelor Programs: +2 or equivalent from a recognized board.",
    "Master Programs: Bachelor's degree from a recognized university.",
    "Minimum academic requirements as per Tribhuvan University.",
  ];

  return (
    <div className="bg-gray-50 overflow-hidden">

      {/* ================= HERO ================= */}
      <motion.section
        className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-24"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">

          <motion.div
            animate={{ rotate: [0, 10, -10, 0], y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <FaGraduationCap className="mx-auto text-7xl text-yellow-400 mb-6" />
          </motion.div>

          <h1 className="text-5xl lg:text-6xl font-bold mb-5">
            Admission Open
          </h1>

          <p className="text-lg max-w-3xl mx-auto text-gray-200">
            Join Janjyoti Multiple Campus and start your journey toward academic excellence and success.
          </p>

        </div>
      </motion.section>

      {/* ================= INFO ================= */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-14">

          {/* Left */}
          <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-6">Admission Information</h2>
            <p className="text-gray-600 leading-8 mb-4">
              Janjyoti Multiple Campus provides quality education under Tribhuvan University.
            </p>
            <p className="text-gray-600 leading-8">
              Students can apply online or visit the campus for assistance.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white shadow-xl rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-5 flex items-center gap-3">
              <FaClipboardCheck className="text-blue-700" />
              Eligibility
            </h3>

            <ul className="space-y-4">
              {eligibility.map((item, i) => (
                <li key={i} className="flex gap-3">
                  <FaArrowRight className="text-green-600 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
          <h2 className="text-4xl font-bold">Required Documents</h2>
        </div>

        <motion.div
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {documents.map((doc, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gray-50 p-6 rounded-xl shadow text-center"
            >
              <FaFileAlt className="text-4xl text-blue-700 mx-auto mb-4" />
              {doc}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= STEPS ================= */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center mb-14">
          <h2 className="text-4xl font-bold">Admission Process</h2>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-white shadow rounded-xl p-8 text-center"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                className="w-14 h-14 bg-blue-700 text-white flex items-center justify-center rounded-full mx-auto mb-4 font-bold"
              >
                {i + 1}
              </motion.div>
              {step}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= DATES ================= */}
      <section className="bg-blue-900 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold">Important Dates</h2>
        </div>

        <div className="space-y-6 max-w-5xl mx-auto px-6">
          {[
            ["Admission Starts", "July 10, 2026"],
            ["Last Date", "August 15, 2026"],
            ["Classes Begin", "September 01, 2026"],
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex justify-between bg-blue-800 p-5 rounded-lg"
            >
              <span className="flex gap-3 items-center">
                <FaCalendarAlt />
                {item[0]}
              </span>
              <strong className="text-yellow-300">{item[1]}</strong>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="bg-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl font-bold">Need Help?</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-50 p-8 rounded-xl text-center">
            <FaPhoneAlt className="text-4xl text-blue-700 mx-auto mb-4" />
            +977-9812345678
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} className="bg-gray-50 p-8 rounded-xl text-center">
            <FaEnvelope className="text-4xl text-blue-700 mx-auto mb-4" />
            admission@jmc.edu.np
          </motion.div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-yellow-400 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">Ready to Join Us?</h2>
        <p className="mb-8">Start your academic journey today.</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-900 text-white px-10 py-4 rounded-xl font-semibold"
        >
          <Link to="/admission-form">Apply Now</Link>
        </motion.button>
      </section>

    </div>
  );
}

export default Admission;