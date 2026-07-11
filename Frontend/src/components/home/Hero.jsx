import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaFire, FaGraduationCap } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Hero() {
  const navigate = useNavigate();

  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await api.get("/heroes");

      if (res.data.success && res.data.data.length > 0) {
        setHero(res.data.data[0]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="h-[90vh] flex items-center justify-center">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </section>
    );
  }

  if (!hero) return null;

  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:h-[92vh] overflow-hidden">
      {/* Background Image */}
      <motion.img
        src={hero.image}
        alt={hero.title}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/40" />

      {/* Blur */}
      <div className="hidden lg:block absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="hidden lg:block absolute bottom-10 right-10 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl py-16 lg:py-0">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm">
              <FaGraduationCap className="text-black text-base" />
              <span>{hero.badge}</span>
              <FaFire className="text-red-500 text-base animate-pulse" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-6 text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-400 leading-tight"
          >
            {hero.title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-sm sm:text-lg lg:text-xl text-gray-200 leading-7 max-w-2xl"
          >
            {hero.subtitle}
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => navigate("/admission-form")}
              className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-white font-semibold px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 shadow-xl"
            >
              Apply Now
              <FaArrowRight />
            </button>

            <button
              onClick={() => navigate("/program")}
              className="w-full sm:w-auto border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-8 py-4 rounded-lg transition duration-300"
            >
              Explore Courses
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
