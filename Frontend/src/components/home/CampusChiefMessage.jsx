import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaArrowRight, FaGraduationCap } from "react-icons/fa";
import api from "../../api/axios";

// ============================
// Animation Variants
// ============================

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8 },
  },
};

// ============================
// Component
// ============================

export default function CampusChiefMessage() {
  const [chief, setChief] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChief();
  }, []);

  const fetchChief = async () => {
    try {
      const res = await api.get("/campus-chief-message");
      setChief(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          Loading Campus Chief Message...
        </h2>
      </section>
    );
  }

  if (!chief) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-gray-500">
          Campus Chief Message Not Available
        </h2>
      </section>
    );
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-blue-50 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute -left-20 top-0 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>
      <div className="absolute -right-20 bottom-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            <FaGraduationCap />
            Leadership Message
          </span>

          <h2 className="text-5xl font-extrabold text-gray-900 mt-5">
            Message from the Campus Chief
          </h2>

          <div className="w-28 h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-5"></div>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
            A warm welcome from the Campus Chief, sharing our vision,
            commitment, and dedication to academic excellence and student
            success.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* LEFT SIDE */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative bg-white rounded-3xl shadow-2xl p-10 border border-gray-100"
          >
            <FaQuoteLeft className="text-blue-600 text-4xl mb-6 opacity-80" />

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Welcome Message from the Campus Chief
            </h3>

            <p className="text-gray-700 text-lg leading-8 text-justify tracking-wide">
              {chief.message}
            </p>

            <div className="mt-10">
              <p className="text-gray-900 font-semibold text-lg">
                {chief.signature}
              </p>

              <p className="text-gray-500 text-sm">{chief.designation}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-lg"
            >
              Read More <FaArrowRight />
            </motion.button>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative flex justify-center items-center"
          >
            {/* Background Glow */}
            <div className="absolute w-80 h-80 bg-blue-300/30 rounded-full blur-3xl"></div>
            <div className="absolute w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

            {/* Image Card */}
            <div className="relative bg-white/70 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white">
              <div className="overflow-hidden rounded-2xl">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  src={chief.image}
                  alt={chief.name}
                  className="w-[380px] h-[420px] object-cover rounded-2xl"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-full shadow-lg text-center whitespace-nowrap">
                <h4 className="font-bold text-gray-800 text-lg">
                  {chief.name}
                </h4>

                <p className="text-sm text-gray-500">{chief.designation}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="mt-20 flex justify-center">
        <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"></div>
      </div>
    </section>
  );
}
