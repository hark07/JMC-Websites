import api from "./axios";

// ===============================
// GET ALL ADMINS
// GET /api/admin/accounts
// ===============================

export const getAllAdmins = async () => {
  const response = await api.get("/admin/accounts");

  return response.data;
};

// ===============================
// CREATE ADMIN
// POST /api/admin/accounts
// ===============================

export const createAdmin = async (data) => {
  const response = await api.post("/admin/accounts", data);

  return response.data;
};

// ===============================
// UPDATE ADMIN
// PUT /api/admin/accounts/:id
// ===============================

export const updateAdmin = async (id, data) => {
  const response = await api.put(`/admin/accounts/${id}`, data);

  return response.data;
};

// ===============================
// DELETE ADMIN
// DELETE /api/admin/accounts/:id
// ===============================

export const deleteAdmin = async (id) => {
  const response = await api.delete(`/admin/accounts/${id}`);

  return response.data;
};
