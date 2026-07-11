import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  FaGraduationCap,
  FaClock,
  FaUserGraduate,
  FaArrowRight,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import api from "../api/axios";

const container = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 0.6,
    },
  },
};

const Program = () => {
  const [programs, setPrograms] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await api.get("/programs");

        setPrograms(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-[#082b4f]">
          Loading Programs...
        </h1>
      </div>
    );
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <motion.div
          initial={{
            opacity: 0,
            y: -30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-14"
        >
          <span className="text-red-500 font-semibold uppercase tracking-widest">
            Academic Programs
          </span>

          <h2 className="text-4xl font-bold text-[#082b4f] mt-3">
            Explore Our Programs
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Janjyoti Multiple Campus offers quality undergraduate and
            postgraduate programs affiliated with Tribhuvan University.
          </p>
        </motion.div>

        {/* Cards */}

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
          }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {programs.map((program) => (
            <motion.div
              key={program._id}
              variants={item}
              whileHover={{
                y: -8,
              }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-200 group"
            >
              <div className="h-2 bg-gradient-to-r from-red-500 to-[#082b4f]" />

              <div className="p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                      {program.code}
                    </span>

                    <h3 className="text-2xl font-bold text-[#082b4f] mt-4">
                      {program.title}
                    </h3>
                  </div>

                  <FaGraduationCap className="text-5xl text-red-500 group-hover:scale-110 transition" />
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <FaClock className="text-red-500" />

                    <span>
                      <strong>Duration:</strong> {program.duration}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <FaUserGraduate className="text-red-500 mt-1" />

                    <span>
                      <strong>Eligibility:</strong> {program.eligibility}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/program/${program.slug}`}
                  className="mt-8 inline-flex items-center gap-2 bg-[#082b4f] hover:bg-red-500 text-white px-6 py-3 rounded-lg transition"
                >
                  View Details
                  <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Program;
