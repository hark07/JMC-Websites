import { useEffect, useState } from "react";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../api/axios";

export default function NoticesDownloads() {
  const [notices, setNotices] = useState([]);
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    fetchNotices();
    fetchDownloads();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await api.get("/notices");
      setNotices(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDownloads = async () => {
    try {
      const res = await api.get("/downloads");
      setDownloads(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
        {/* Notices */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-8">Notices</h2>

          <div className="space-y-4">
            {notices.length ? (
              notices.slice(0, 5).map((notice) => (
                <div
                  key={notice._id}
                  className="flex justify-between items-center border rounded-xl p-4"
                >
                  <p className="font-medium">{notice.title}</p>

                  <span className="bg-red-500 text-white text-xs px-3 py-2 rounded-lg">
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No notices available.</p>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/notice"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full"
            >
              See More
              <FaArrowRight />
            </Link>
          </div>
        </div>

        {/* Downloads */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-3xl font-bold text-center mb-8">Downloads</h2>

          <div className="space-y-4">
            {downloads.length ? (
              downloads.slice(0, 5).map((download) => (
                <div
                  key={download._id}
                  className="flex justify-between items-center border rounded-xl p-4"
                >
                  <p className="font-medium">{download.title}</p>

                  <a
                    href={`http://localhost:5000/api/downloads/file/${download._id}`}
                    className="bg-slate-900 hover:bg-slate-700 text-white p-3 rounded-lg"
                  >
                    <FaDownload />
                  </a>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No downloads available.
              </p>
            )}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/downloads"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full"
            >
              See More
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
