import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowUp,
} from "react-icons/fa";
import assets from "../../assets/assets";

function Footer() {
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 text-gray-300 mt-20 relative">
      {/* Top Section */}
      <div className="max-w-8xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={assets.logo}
                alt="Janjyoti Multiple Campus Logo"
                className="w-16 h-16 rounded-full border-2 border-yellow-400 bg-white object-cover p-1"
              />

              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  Janjyoti Multiple Campus
                </h2>

                <p className="text-sm text-yellow-400 font-medium">
                  Affiliated to Tribhuvan University
                </p>

                <p className="text-xs text-gray-400">
                  Bhimdatt-18, Kanchanpur, Nepal
                </p>
              </div>
            </div>

            <p className="leading-7 text-gray-400">
              Janjyoti Multiple Campus is committed to providing quality
              education, innovation, leadership, and lifelong learning
              opportunities for students.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 transition duration-300 flex items-center justify-center"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 transition duration-300 flex items-center justify-center"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full bg-slate-800 hover:bg-sky-600 transition duration-300 flex items-center justify-center"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-slate-700 pb-2">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/admission"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  Admission
                </Link>
              </li>

              <li>
                <Link
                  to="/notice"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  Notice
                </Link>
              </li>

              <li>
                <Link
                  to="/gallery"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  Gallery
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-yellow-400 transition duration-300"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Services */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-slate-700 pb-2">
              Student Services
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-yellow-400 transition cursor-pointer">
                Exam Results
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Academic Calendar
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Library
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Downloads
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Scholarships
              </li>

              <li className="hover:text-yellow-400 transition cursor-pointer">
                Student Portal
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6 border-b border-slate-700 pb-2">
              Contact Us
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 text-lg" />
                <p>Bhimdatt-18, Kanchanpur, Nepal</p>
              </div>

              <div className="flex items-start gap-3">
                <FaEnvelope className="text-yellow-400 mt-1 text-lg" />
                <a
                  href="mailto:info@jmc.edu.np"
                  className="hover:text-yellow-400 transition"
                >
                  info@jmc.edu.np
                </a>
              </div>

              <div className="flex items-start gap-3">
                <FaPhoneAlt className="text-yellow-400 mt-1 text-lg" />
                <a
                  href="tel:+9779812345678"
                  className="hover:text-yellow-400 transition"
                >
                  +977-9800000000
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Janjyoti Multiple Campus. All Rights
            Reserved.
          </p>

          <p className="text-gray-500 text-sm">
            Designed & Developed by{" "}
            <span className="text-yellow-400 font-semibold">
              Hark Dhami
            </span>
          </p>
        </div>
      </div>

      {/* Back To Top */}
      <button
        onClick={scrollTop}
        aria-label="Back to top"
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-800 text-white shadow-xl flex items-center justify-center transition duration-300 z-50"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}

export default Footer;