import { motion } from "framer-motion";
import {
  FaBook,
  FaChartLine,
  FaChalkboardTeacher,
  FaArrowRight,
} from "react-icons/fa";

const faculties = [
  {
    title: "Faculty of Humanities and Social Sciences",
    color: "from-indigo-600 via-blue-600 to-cyan-500",
    icon: FaBook,
  },
  {
    title: "Faculty of Management",
    color: "from-emerald-500 via-green-600 to-teal-600",
    icon: FaChartLine,
  },
  {
    title: "Faculty of Education",
    color: "from-orange-500 via-amber-500 to-yellow-500",
    icon: FaChalkboardTeacher,
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

export default function FacultiesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-blue-50 py-16 sm:py-20 lg:py-24">
      {/* Background Blur */}
      <div className="absolute -top-24 left-0 h-72 w-72 rounded-full bg-blue-300/20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 text-center lg:mb-16"
        >
          <span className="inline-block rounded-full bg-blue-100 px-5 py-2 text-sm font-semibold text-blue-700 sm:text-base">
            Academic Faculties
          </span>

          <h2 className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-5xl">
            Our Faculties
          </h2>

          <div className="mx-auto mt-5 h-1 w-24 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 sm:w-28"></div>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
            Janjyoti Multiple Campus offers quality higher education through
            three academic faculties under Tribhuvan University.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {faculties.map((faculty, index) => {
            const Icon = faculty.icon;

            return (
              <motion.div
                key={index}
                variants={card}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-3xl shadow-xl"
              >
                {/* Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${faculty.color}`}
                />

                {/* Content */}
                <div className="relative flex min-h-[360px] flex-col items-center justify-center border border-white/20 bg-white/10 px-6 py-10 text-center backdrop-blur-md sm:min-h-[390px] lg:min-h-[410px]">
                  {/* Icon */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 shadow-2xl sm:h-24 sm:w-24 lg:h-28 lg:w-28"
                  >
                    <Icon className="text-4xl text-white sm:text-5xl lg:text-6xl" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mt-8 text-xl font-bold leading-relaxed text-white sm:text-2xl">
                    {faculty.title}
                  </h3>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-8 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-lg transition hover:bg-gray-100 sm:px-6 sm:text-base"
                  >
                    Explore
                    <FaArrowRight />
                  </motion.button>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-white/10"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}