import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import API from "../api/axios";

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch All Admissions
  const fetchAdmissions = async () => {
    try {
      const res = await API.get("/admissions");
      setAdmissions(res.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load admissions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // Delete Admission
  const deleteAdmission = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission?",
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/admissions/${id}`);
      toast.success("Admission deleted successfully");
      fetchAdmissions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold text-blue-600">
        Loading Admissions...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />

      <div className="min-h-screen bg-gray-100 p-3 sm:p-5 lg:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-center text-blue-700 mb-6">
            Admin Admission Dashboard
          </h1>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead className="bg-blue-700 text-white">
                  <tr>
                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Photo
                    </th>

                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Name
                    </th>

                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Mobile
                    </th>

                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Email
                    </th>

                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Faculty
                    </th>

                    <th className="px-4 py-3 text-left whitespace-nowrap">
                      Date
                    </th>

                    <th className="px-4 py-3 text-center whitespace-nowrap">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {admissions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="7"
                        className="py-10 text-center text-gray-500 font-medium"
                      >
                        No Admission Found
                      </td>
                    </tr>
                  ) : (
                    admissions.map((item) => (
                      <tr
                        key={item._id}
                        className="border-b hover:bg-blue-50 transition"
                      >
                        <td className="px-4 py-3 text-center">
                          {item.studentPhoto?.url ? (
                            <img
                              src={item.studentPhoto.url}
                              alt="student"
                              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-blue-200 mx-auto"
                            />
                          ) : (
                            <span>No Photo</span>
                          )}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap font-semibold">
                          {item.fullName}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.mobile}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.email || "-"}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {item.admission?.faculty || "-"}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex flex-col sm:flex-row gap-2 justify-center">
                            <Link
                              to={`/admin/admissions/${item._id}`}
                              className="bg-green-600 hover:bg-green-700 text-white text-center px-3 py-2 rounded-lg text-sm transition"
                            >
                              View
                            </Link>

                            <Link
                              to={`/admin/admissions/edit/${item._id}`}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white text-center px-3 py-2 rounded-lg text-sm transition"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => deleteAdmission(item._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAdmissions;
