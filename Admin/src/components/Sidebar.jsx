import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaBullhorn,
  FaImages,
  FaGraduationCap,
  FaCalendarAlt,
  FaNewspaper,
  FaBell,
  FaDownload,
  FaUsers,
  FaInfoCircle,
  FaImage,
  FaFileAlt,
  FaUser,
  FaKey,
  FaUserShield,
  FaTimes,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { PERMISSIONS } from "../constants/permissions";

export default function Sidebar({ open, setOpen }) {
  const { user } = useAuth();

  const role = user?.role;

  const permissions = user?.permissions || [];

  const isSuperAdmin = role === "SUPER_ADMIN";

  // ======================================
  // CHECK PERMISSION
  // ======================================

  const hasPermission = (permission) => {
    if (isSuperAdmin) return true;

    return permissions.includes(permission);
  };

  // ======================================
  // MENU
  // ======================================

  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
      permission: PERMISSIONS.DASHBOARD_VIEW,
    },

    {
      name: "Highlights",
      path: "/highlights",
      icon: <FaBullhorn />,
      permission: PERMISSIONS.HIGHLIGHT_READ,
    },

    {
      name: "Hero",
      path: "/heroes",
      icon: <FaImages />,
      permission: PERMISSIONS.HERO_READ,
    },

    {
      name: "Programs",
      path: "/program-management",
      icon: <FaGraduationCap />,
      permission: PERMISSIONS.PROGRAM_READ,
    },

    {
      name: "Events",
      path: "/events",
      icon: <FaCalendarAlt />,
      permission: PERMISSIONS.EVENT_READ,
    },

    {
      name: "News",
      path: "/news",
      icon: <FaNewspaper />,
      permission: PERMISSIONS.NEWS_READ,
    },

    {
      name: "Notice",
      path: "/notices",
      icon: <FaBell />,
      permission: PERMISSIONS.NOTICE_READ,
    },

    {
      name: "Documents",
      path: "/downloads",
      icon: <FaDownload />,
      permission: PERMISSIONS.DOWNLOAD_READ,
    },

    {
      name: "Gallery",
      path: "/gallery",
      icon: <FaImage />,
      permission: PERMISSIONS.GALLERY_READ,
    },

    {
      name: "Admission",
      path: "/admission",
      icon: <FaFileAlt />,
      permission: PERMISSIONS.ADMISSION_READ,
    },

    {
      name: "Campus Chief Message",
      path: "/campusChiefMessage",
      icon: <FaFileAlt />,
      permission: PERMISSIONS.CAMPUS_CHIEF_READ,
    },

    {
      name: "Contact",
      path: "/contact",
      icon: <FaUsers />,
      permission: PERMISSIONS.CONTACT_READ,
    },

    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
      permission: PERMISSIONS.ABOUT_READ,
    },
  ];

  // ======================================
  // SUPER ADMIN MENU
  // ======================================

  if (isSuperAdmin) {
    menu.push({
      name: "Admin Management",
      path: "/admins",
      icon: <FaUserShield />,
    });
  }

  // ======================================
  // COMMON MENU
  // ======================================

  menu.push(
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      name: "Change Password",
      path: "/change-password",
      icon: <FaKey />,
    },
  );

  return (
    <>
      {/* Mobile Overlay */}

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
fixed
top-0
left-0
z-50
h-screen
w-64
bg-slate-900
text-white
shadow-xl
flex
flex-col
transition-transform
duration-300

${open ? "translate-x-0" : "-translate-x-full"}

lg:translate-x-0
`}
      >
        {/* Header */}

        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">JMC Admin</h1>

          <button className="lg:hidden text-xl" onClick={() => setOpen(false)}>
            <FaTimes />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-2">
          {menu
            .filter(
              (item) => !item.permission || hasPermission(item.permission),
            )
            .map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `
flex
items-center
gap-3
px-4
py-3
rounded-xl
transition

${
  isActive
    ? "bg-blue-600 text-white"
    : "text-slate-300 hover:bg-slate-800 hover:text-white"
}
`
                }
              >
                <span className="text-lg">{item.icon}</span>

                <span>{item.name}</span>
              </NavLink>
            ))}
        </nav>

        {/* Footer */}

        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || "A"}
            </div>

            <div className="overflow-hidden">
              <h3 className="font-semibold truncate">
                {user?.name || "Administrator"}
              </h3>

              <p className="text-xs text-slate-400">{role || "ADMIN"}</p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500 mt-4">
            © {new Date().getFullYear()} Janjyoti Multiple Campus
          </p>
        </div>
      </aside>
    </>
  );
}
