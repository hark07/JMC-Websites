import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaNewspaper,
  FaArrowRight,
  FaClock,
  FaMapMarkerAlt,
} from "react-icons/fa";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7 },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

export default function EventsNews() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
    fetchNews();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await api.get("/news");
      setNews(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Background Blur */}
      <div className="absolute -top-20 left-0 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold">
            Campus Updates
          </span>

          <h2 className="text-5xl font-bold mt-5">Events & News</h2>

          <p className="text-gray-600 mt-6 max-w-3xl mx-auto">
            Stay informed with our latest events and news.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-10"
        >
          {/* EVENTS */}
          <motion.div
            variants={card}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-5 flex items-center gap-3">
              <FaCalendarAlt className="text-white text-2xl" />
              <h3 className="text-2xl font-bold text-white">Upcoming Events</h3>
            </div>

            <div className="p-6 space-y-5">
              {events.length > 0 ? (
                events.slice(0, 5).map((event) => (
                  <div
                    key={event._id}
                    className="flex gap-5 border rounded-2xl p-5 hover:shadow-lg transition"
                  >
                    <div className="bg-blue-600 text-white rounded-xl p-4 text-center min-w-[90px]">
                      <h3 className="text-2xl font-bold">
                        {new Date(event.date).getDate()}
                      </h3>

                      <p>
                        {new Date(event.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </p>

                      <small>{new Date(event.date).getFullYear()}</small>
                    </div>

                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{event.title}</h4>

                      <div className="mt-3 flex flex-wrap gap-4 text-gray-500 text-sm">
                        <span className="flex items-center gap-2">
                          <FaClock />
                          {event.time}
                        </span>

                        <span className="flex items-center gap-2">
                          <FaMapMarkerAlt />
                          {event.location}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 py-10">
                  No events available.
                </p>
              )}
            </div>
          </motion.div>

          {/* NEWS */}
          <motion.div
            variants={card}
            className="bg-white rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="bg-slate-800 px-6 py-5 flex items-center gap-3">
              <FaNewspaper className="text-white text-2xl" />
              <h3 className="text-2xl font-bold text-white">Latest News</h3>
            </div>

            <div className="p-6">
              {news.length > 0 ? (
                <>
                  {news.slice(0, 5).map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center py-5 border-b last:border-none hover:bg-blue-50 px-3 rounded-xl transition"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{item.title}</h4>

                        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
                          <FaClock />
                          {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <FaArrowRight className="text-blue-600 ml-4" />
                    </div>
                  ))}

                  <div className="text-center mt-8">
                    <button onClick={() => navigate()} className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-700 to-cyan-600 text-white font-semibold flex items-center gap-3 mx-auto hover:scale-105 transition">
                      View More
                      <FaArrowRight />
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-center text-gray-500 py-10">
                  No news available.
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
