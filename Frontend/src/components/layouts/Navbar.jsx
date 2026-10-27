import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaBell,
  FaClipboardList,
  FaBars,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";

import assets from "../../assets/assets";
import api from "../../api/axios";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [highlights, setHighlights] = useState([]);

  // Hide top bar when scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch highlights
  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await api.get("/highlights");

        if (res.data?.success) {
          setHighlights(res.data.data || []);
        }
      } catch (error) {
        console.error("Highlights fetch failed:", error);
      }
    };

    fetchHighlights();
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/program" },
    { name: "Gallery", path: "/gallery" },
    { name: "Cells & Units", path: "/cells-units" },
    { name: "Facilities", path: "/facilities" },
  ];

  const publicationLinks = [
    { name: "Notices", path: "/notice" },
    { name: "Downloads", path: "/downloads" },
    { name: "Results", path: "/results" },
  ];

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="w-full bg-white">

      {/* TOP CONTACT BAR */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          scrolled
            ? "max-h-0 opacity-0"
            : "max-h-20 opacity-100"
        }`}
      >
        <div className="bg-[#07545b] text-white">
          <div className="mx-auto flex min-h-12 max-w-[1500px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2 sm:px-6 lg:px-10">

            {/* Contact information */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold sm:text-sm">

              <a
                href="tel:025586701"
                className="flex items-center gap-2 transition hover:text-orange-300"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                  <FaPhoneAlt size={11} />
                </span>
                <span>025-586701 / 585701</span>
              </a>

              <span className="hidden h-5 border-l border-white/30 sm:block" />

              <a
                href="mailto:contact@namunacollege.edu.np"
                className="flex items-center gap-2 transition hover:text-orange-300"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10">
                  <FaEnvelope size={11} />
                </span>
                <span>contact@namunacollege.edu.np</span>
              </a>
            </div>

            {/* Notices and results */}
            <div className="flex items-center gap-3">
              <NavLink
                to="/notice"
                className="flex items-center gap-2 rounded-full bg-orange-500 px-3 py-2 text-xs font-bold text-white transition hover:bg-orange-600 sm:px-4"
              >
                <FaBell size={11} />
                NOTICES
              </NavLink>

              <NavLink
                to="/results"
                className="flex items-center gap-2 rounded-full border border-orange-400/50 px-3 py-2 text-xs font-bold text-orange-400 transition hover:bg-orange-500 hover:text-white sm:px-4"
              >
                <FaClipboardList size={11} />
                RESULTS
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="relative w-full bg-transparent">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="flex min-h-[94px] items-center justify-between gap-4 py-3 sm:min-h-[106px] lg:min-h-[112px]">

            {/* LOGO + COLLEGE NAME */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex min-w-0 items-center gap-2 text-left sm:gap-3"
              aria-label="Go to homepage"
            >
              <img
                src={assets.logo}
                alt="College Logo"
                className="h-12 w-12 shrink-0 object-contain sm:h-16 sm:w-16 lg:h-[76px] lg:w-[76px]"
              />

              <div className="min-w-0">
                <h1 className="text-base font-extrabold leading-tight tracking-tight text-[#07545b] sm:text-xl md:text-2xl lg:text-[27px]">
                  Janjyoti Multiple Campus
                </h1>

                <p className="mt-1 text-xs font-bold text-[#07545b] sm:text-sm md:text-base">
                  Tribhuvan University
                </p>

                <p className="mt-0.5 text-[10px] text-orange-500 sm:text-xs md:text-sm">
                  Bhimdatt-18, Kanchanpur
                </p>
              </div>
            </button>

            {/* MOBILE MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-2xl text-[#07545b] transition hover:bg-gray-100 lg:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

          </div>
        </div>
      </header>

      {/* DESKTOP NAVIGATION */}
      <nav className="relative z-20 w-full border-t border-gray-100 bg-transparent">
        <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">

          <div className="hidden min-h-[66px] items-center justify-between gap-5 lg:flex">

            <div className="flex min-w-0 items-center gap-5 xl:gap-8">
              {navLinks.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `relative whitespace-nowrap py-5 text-sm font-medium transition xl:text-base ${
                      isActive
                        ? "text-[#07545b] after:absolute after:bottom-3 after:left-0 after:h-0.5 after:w-full after:bg-[#07545b]"
                        : "text-slate-700 hover:text-[#07545b]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              {/* PUBLICATIONS DROPDOWN */}
              <div className="group relative">
                <button
                  type="button"
                  className="flex items-center gap-2 whitespace-nowrap py-5 text-sm font-medium text-slate-700 transition hover:text-[#07545b] xl:text-base"
                >
                  Publications
                  <FaChevronDown
                    size={11}
                    className="transition-transform group-hover:rotate-180"
                  />
                </button>

                <div className="invisible absolute left-0 top-full z-50 w-48 translate-y-2 rounded-md border border-gray-100 bg-white py-2 opacity-0 shadow-lg transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  {publicationLinks.map((item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      className="block px-4 py-3 text-sm text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                    >
                      {item.name}
                    </NavLink>
                  ))}
                </div>
              </div>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `whitespace-nowrap text-sm font-medium transition xl:text-base ${
                    isActive
                      ? "text-[#07545b]"
                      : "text-slate-700 hover:text-[#07545b]"
                  }`
                }
              >
                Contact
              </NavLink>
            </div>

            {/* APPLY NOW */}
            <NavLink
              to="/admission"
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-orange-600 hover:shadow-lg xl:px-6 xl:text-base"
            >
              Apply Now
            </NavLink>
          </div>

          {/* MOBILE MENU */}
          {menuOpen && (
            <div className="border-t border-gray-100 bg-white py-3 lg:hidden">
              <div className="flex flex-col gap-1">

                {[...navLinks, ...publicationLinks.slice(0, 1), { name: "Downloads", path: "/downloads" }, { name: "Contact", path: "/contact" }].map(
                  (item) => (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `rounded-md px-4 py-3 text-sm font-medium transition ${
                          isActive
                            ? "bg-[#07545b] text-white"
                            : "text-slate-700 hover:bg-orange-50 hover:text-orange-600"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
                )}

                <NavLink
                  to="/results"
                  onClick={closeMenu}
                  className="rounded-md px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-orange-50 hover:text-orange-600"
                >
                  Results
                </NavLink>

                <NavLink
                  to="/admission"
                  onClick={closeMenu}
                  className="mt-2 rounded-md bg-orange-500 px-4 py-3 text-center text-sm font-bold text-white transition hover:bg-orange-600"
                >
                  Apply Now
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HIGHLIGHTS TICKER */}
      <section className="flex h-10 w-full items-center overflow-hidden border-y border-gray-200 bg-white sm:h-11">

        <div className="z-10 flex h-full shrink-0 items-center justify-center bg-gradient-to-r from-red-600 to-orange-500 px-3 text-xs font-bold uppercase tracking-wide text-white sm:px-5 sm:text-sm">
          Highlights
        </div>

        <div className="relative flex h-full min-w-0 flex-1 items-center overflow-hidden">
          {highlights.length > 0 ? (
            <div className="ticker-track">
              {[...highlights, ...highlights].map((item, index) => (
                <span key={index} className="ticker-item">
                  {typeof item === "string" ? item : item.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="px-4 text-xs text-slate-500 sm:text-sm">
              Welcome to Janjyoti Multiple Campus
            </p>
          )}
        </div>
      </section>

    </div>
  );
}

export default Navbar;
