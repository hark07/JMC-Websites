import { createContext, useContext, useState, useEffect } from "react";

import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ===============================
  // LOAD USER AFTER REFRESH
  // ===============================

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const savedAdmin = localStorage.getItem("admin");

    if (token && savedAdmin) {
      setUser(JSON.parse(savedAdmin));
    }

    setLoading(false);
  }, []);

  // ===============================
  // LOGIN
  // ===============================

  const login = async (email, password) => {
    try {
      const response = await api.post("/admin/auth/login", {
        emailOrPhone: email,
        password,
      });

      const data = response.data.data;

      if (!data.admin) {
        throw new Error("Admin data missing");
      }

      const adminData = {
        _id: data.admin._id,

        name: data.admin.name,

        email: data.admin.email,

        phone: data.admin.phone,

        role: data.admin.role,

        permissions: data.admin.permissions || [],

        status: data.admin.status,

        profileImage: data.admin.profileImage || null,
      };

      // SAVE TOKEN

      localStorage.setItem("accessToken", data.accessToken);

      localStorage.setItem("refreshToken", data.refreshToken);

      // SAVE ADMIN

      localStorage.setItem("admin", JSON.stringify(adminData));

      setUser(adminData);

      return true;
    } catch (error) {
      console.log("LOGIN ERROR:", error.response?.data || error.message);

      return false;
    }
  };

  // ===============================
  // REGISTER
  // ===============================

  const register = async (formData) => {
    try {
      const response = await api.post("/admin/auth/register", formData);

      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  };

  // ===============================
  // LOGOUT
  // ===============================

  const logout = async () => {
    try {
      await api.post("/admin/auth/logout", {
        refreshToken: localStorage.getItem("refreshToken"),
      });
    } catch (error) {
      console.log("Logout error", error);
    }

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    localStorage.removeItem("admin");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        setUser,

        login,

        register,

        logout,

        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
