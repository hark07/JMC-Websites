import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPaperPlane,
  FaBullhorn,
} from "react-icons/fa";

import { motion } from "framer-motion";

import api from "../api/axios";

// ================= ANIMATION =================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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
    },
  },
};

const stagger = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const socialIcons = [FaFacebookF, FaInstagram, FaLinkedinIn];

// ================= COMPONENT =================

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState("");

  // ================= INPUT CHANGE =================

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  // ================= SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      setStatus("Please fill all fields");

      return;
    }

    try {
      setLoading(true);

      setStatus("");

      await api.post("/contacts", formData);

      setStatus("Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      setStatus("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 overflow-hidden">
      {/* ================= HERO ================= */}

      <motion.section
        className="
bg-gradient-to-r
from-blue-900
via-blue-800
to-blue-700
text-white
py-24
"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
text-center
"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            <FaBullhorn
              className="
mx-auto
text-7xl
mb-6
text-yellow-400
"
            />
          </motion.div>

          <h1
            className="
text-5xl
lg:text-6xl
font-bold
mb-4
"
          >
            Contact Us
          </h1>

          <p
            className="
text-lg
text-gray-200
max-w-3xl
mx-auto
"
          >
            We'd love to hear from you. Contact us for admissions, academic
            information, or campus support.
          </p>
        </div>
      </motion.section>

      {/* ================= CONTACT INFO ================= */}

      <section
        className="
max-w-7xl
mx-auto
px-6
py-24
"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
          className="
grid
md:grid-cols-2
lg:grid-cols-4
gap-8
"
        >
          {[
            {
              icon: <FaMapMarkerAlt />,
              title: "Address",
              text: "Bhimdatt-18, Kanchanpur, Nepal",
              color: "text-blue-700",
            },

            {
              icon: <FaPhoneAlt />,
              title: "Phone",
              text: "+977-9800000000",
              color: "text-green-600",
            },

            {
              icon: <FaEnvelope />,
              title: "Email",
              text: "info@jmc.edu.np",
              color: "text-red-600",
            },

            {
              icon: <FaClock />,
              title: "Office Hours",
              text: "Sun-Fri\n10:00 AM - 5:00 PM",
              color: "text-yellow-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              whileHover={{
                scale: 1.05,
                y: -10,
              }}
              className="
bg-white
rounded-2xl
shadow-lg
p-8
text-center
"
            >
              <div
                className={`
${item.color}
text-5xl
mx-auto
mb-5
flex
justify-center
`}
              >
                {item.icon}
              </div>

              <h3
                className="
text-xl
font-bold
mb-2
"
              >
                {item.title}
              </h3>

              <p
                className="
text-gray-600
whitespace-pre-line
"
              >
                {item.text}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ================= FORM + MAP ================= */}

      <section
        className="
bg-white
py-24
"
      >
        <div
          className="
max-w-7xl
mx-auto
px-6
grid
lg:grid-cols-2
gap-16
"
        >
          {/* FORM */}

          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            <h2
              className="
text-4xl
font-bold
mb-8
"
            >
              Send us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="
space-y-6
"
            >
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="
w-full
border
rounded-lg
px-5
py-3
focus:ring-2
focus:ring-blue-700
"
              />

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="
w-full
border
rounded-lg
px-5
py-3
focus:ring-2
focus:ring-blue-700
"
              />

              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="
w-full
border
rounded-lg
px-5
py-3
focus:ring-2
focus:ring-blue-700
"
              />

              <textarea
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="
w-full
border
rounded-lg
px-5
py-3
focus:ring-2
focus:ring-blue-700
"
              />

              {status && (
                <p
                  className={`
font-semibold

${status.includes("success") ? "text-green-600" : "text-red-600"}

`}
                >
                  {status}
                </p>
              )}

              <motion.button
                disabled={loading}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="
bg-blue-900
hover:bg-blue-800
disabled:bg-gray-400
text-white
px-8
py-3
rounded-lg
flex
items-center
gap-3
"
              >
                <FaPaperPlane />

                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

          {/* MAP */}

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
          >
            <h2
              className="
text-4xl
font-bold
mb-8
"
            >
              Find Us
            </h2>

            <iframe
              title="Janjyoti Multiple Campus Location"
              src="
https://www.google.com/maps?q=Janjyoti%20Multiple%20Campus%2C%20Bhimdatt%2C%20Kanchanpur%2C%20Nepal&output=embed
"
              width="100%"
              height="500"
              className="
rounded-xl
shadow-lg
border-0
"
              loading="lazy"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* ================= SOCIAL ================= */}

      <section
        className="
py-24
"
      >
        <motion.div
          className="
max-w-5xl
mx-auto
px-6
text-center
"
          initial={{
            opacity: 0,
            y: 60,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          <h2
            className="
text-4xl
font-bold
mb-6
"
          >
            Follow Us
          </h2>

          <p
            className="
text-gray-600
mb-10
"
          >
            Stay connected with our social media platforms.
          </p>

          <div
            className="
flex
justify-center
gap-6
"
          >
            {socialIcons.map((Icon, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{
                  scale: 1.2,
                  rotate: 10,
                }}
                className="
w-14
h-14
rounded-full
bg-blue-700
text-white
flex
items-center
justify-center
"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Contact;
