import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaInfoCircle,
  FaUniversity,
  FaBullhorn,
  FaImages,
  FaEnvelope,
  FaDownload,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { IoShareSocial } from "react-icons/io5";

import assets from "../../assets/assets";

import api from "../../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  // ==========================
  // Backend Highlights
  // ==========================

  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const res = await api.get("/highlights");

      if (res.data.success) {
        setHighlights(res.data.data || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Navigation Links
  // ==========================

  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome size={15} />,
    },

    {
      name: "About Us",
      path: "/about",
      icon: <FaInfoCircle size={15} />,
    },

    {
      name: "Programs",
      path: "/program",
      icon: <FaUniversity size={15} />,
    },

    {
      name: "Admission",
      path: "/admission",
      icon: <FaUniversity size={15} />,
    },

    {
      name: "Notice",
      path: "/notice",
      icon: <FaBullhorn size={15} />,
    },

    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImages size={15} />,
    },

    {
      name: "Contact",
      path: "/contact",
      icon: <FaEnvelope size={15} />,
    },

    {
      name: "Downloads",
      path: "/downloads",
      icon: <FaDownload size={15} />,
    },
  ];

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* HEADER */}

      <header className="bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between py-3">
            {/* LOGO */}

            <div
              onClick={() => navigate("/")}
              className="flex items-center gap-3 cursor-pointer flex-1"
            >
              <img
                src={assets.logo}
                alt="Campus Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain"
              />

              <div>
                <h2 className="font-bold text-slate-900 leading-tight text-sm sm:text-lg md:text-2xl">
                  Janjyoti Multiple Campus
                </h2>

                <p className="text-blue-700 font-semibold text-xs sm:text-sm md:text-lg">
                  Tribhuvan University
                </p>

                <p className="text-orange-500 text-[11px] sm:text-xs md:text-base">
                  Bhimdatt-18, Kanchanpur
                </p>
              </div>
            </div>

            {/* SOCIAL */}

            <div className="hidden lg:flex items-center gap-3">
              <a
                href="#"
                className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="text-orange-500 hover:text-orange-700 transition"
              >
                <FaTwitter size={22} />
              </a>

              <a
                href="#"
                className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
              >
                <FaLinkedinIn />
              </a>

              <a
                href="#"
                className="text-orange-500 hover:text-orange-700 transition"
              >
                <IoShareSocial size={24} />
              </a>
            </div>

            {/* MOBILE BUTTON */}

            <button
              className="lg:hidden text-3xl text-slate-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </header>

      {/* NAVIGATION */}

      <nav className="bg-gray-200 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="hidden lg:flex items-center justify-center gap-10 h-14">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 font-medium transition duration-300 ${
                      isActive
                        ? "text-blue-700"
                        : "text-slate-800 hover:text-orange-500"
                    }`
                  }
                >
                  {item.icon}

                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* MOBILE MENU */}

          {menuOpen && (
            <div className="lg:hidden py-4">
              <ul className="space-y-2">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                          isActive
                            ? "bg-blue-700 text-white"
                            : "text-slate-700 hover:bg-gray-100"
                        }`
                      }
                    >
                      {item.icon}

                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div className="flex justify-center gap-5 mt-6">
                <FaFacebookF className="text-orange-500 text-xl" />

                <FaTwitter className="text-orange-500 text-xl" />

                <FaLinkedinIn className="text-orange-500 text-xl" />

                <IoShareSocial className="text-orange-500 text-xl" />
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* TICKER */}

      <div className="flex items-center bg-white border-y border-gray-300 overflow-hidden h-12">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold uppercase tracking-wide px-6 h-full flex items-center shrink-0">
          Highlights
        </div>

        <div className="relative flex-1 overflow-hidden h-full flex items-center">
          <div className="ticker-track">
            {[...highlights, ...highlights].map((item, index) => (
              <div key={index} className="ticker-item">
                {item.title || item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
