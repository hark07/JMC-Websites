import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaImages,
  FaUsers,
  FaBox,
  FaNewspaper,
  FaCalendarAlt,
  FaBullhorn,
  FaBell,
  FaDownload,
  FaInfoCircle,
  FaImage,
  FaFileAlt,
  FaUserTie,
} from "react-icons/fa";

import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { PERMISSIONS } from "../constants/permissions";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [cards, setCards] = useState([]);

  const role = user?.role;

  const permissions = user?.permissions || [];

  const isSuperAdmin = role === "SUPER_ADMIN";

  const hasPermission = (permission) => {
    if (isSuperAdmin) return true;

    return permissions.includes(permission);
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const requests = [];

      if (hasPermission(PERMISSIONS.HERO_READ))
        requests.push(api.get("/heroes"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.PROGRAM_READ))
        requests.push(api.get("/programs"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.NEWS_READ)) requests.push(api.get("/news"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.EVENT_READ))
        requests.push(api.get("/events"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.GALLERY_READ))
        requests.push(api.get("/gallery"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.HIGHLIGHT_READ))
        requests.push(api.get("/highlights"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.NOTICE_READ))
        requests.push(api.get("/notices"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.DOWNLOAD_READ))
        requests.push(api.get("/downloads"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.CONTACT_READ))
        requests.push(api.get("/contacts"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.ABOUT_READ))
        requests.push(api.get("/about"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.ADMISSION_READ))
        requests.push(api.get("/admissions"));
      else requests.push(Promise.resolve({ data: { data: [] } }));

      if (hasPermission(PERMISSIONS.CAMPUS_CHIEF_READ))
        requests.push(api.get("/campus-chief-message"));
      else requests.push(Promise.resolve({ data: { data: null } }));

      const [
        heroes,
        programs,
        news,
        events,
        gallery,
        highlights,
        notices,
        downloads,
        contacts,
        about,
        admissions,
        campusChief,
      ] = await Promise.all(requests);

      const dashboardCards = [
        {
          title: "Highlights",
          permission: PERMISSIONS.HIGHLIGHT_READ,
          count: highlights.data.count || highlights.data.data.length,
          icon: <FaBullhorn />,
          path: "/highlights",
        },
        {
          title: "Hero",
          permission: PERMISSIONS.HERO_READ,
          count: heroes.data.count || heroes.data.data.length,
          icon: <FaImages />,
          path: "/heroes",
        },
        {
          title: "Programs",
          permission: PERMISSIONS.PROGRAM_READ,
          count: programs.data.count || programs.data.data.length,
          icon: <FaBox />,
          path: "/program-management",
        },
        {
          title: "Campus Chief",
          permission: PERMISSIONS.CAMPUS_CHIEF_READ,
          count: campusChief.data.data ? 1 : 0,
          icon: <FaUserTie />,
          path: "/campusChiefMessage",
        },
        {
          title: "Events",
          permission: PERMISSIONS.EVENT_READ,
          count: events.data.count || events.data.data.length,
          icon: <FaCalendarAlt />,
          path: "/events",
        },
        {
          title: "News",
          permission: PERMISSIONS.NEWS_READ,
          count: news.data.count || news.data.data.length,
          icon: <FaNewspaper />,
          path: "/news",
        },
        {
          title: "Notice",
          permission: PERMISSIONS.NOTICE_READ,
          count: notices.data.count || notices.data.data.length,
          icon: <FaBell />,
          path: "/notices",
        },
        {
          title: "Documents",
          permission: PERMISSIONS.DOWNLOAD_READ,
          count: downloads.data.count || downloads.data.data.length,
          icon: <FaDownload />,
          path: "/downloads",
        },
        {
          title: "Contact",
          permission: PERMISSIONS.CONTACT_READ,
          count: contacts.data.count || contacts.data.data.length,
          icon: <FaUsers />,
          path: "/contact",
        },
        {
          title: "About",
          permission: PERMISSIONS.ABOUT_READ,
          count: about.data.count || about.data.data.length,
          icon: <FaInfoCircle />,
          path: "/about",
        },
        {
          title: "Gallery",
          permission: PERMISSIONS.GALLERY_READ,
          count: gallery.data.count || gallery.data.data.length,
          icon: <FaImage />,
          path: "/gallery",
        },
        {
          title: "Admission",
          permission: PERMISSIONS.ADMISSION_READ,
          count: admissions.data.count || admissions.data.data.length,
          icon: <FaFileAlt />,
          path: "/admission",
        },
      ];

      setCards(dashboardCards.filter((card) => hasPermission(card.permission)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="cursor-pointer rounded-xl bg-white p-6 shadow transition-all duration-300 hover:bg-blue-50 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-gray-600">{card.title}</h2>

                <p className="text-3xl font-bold">{card.count}</p>
              </div>

              <div className="text-4xl text-blue-600">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
