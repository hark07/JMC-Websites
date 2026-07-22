import { useEffect, useState } from "react";

import { FaPlus, FaEdit, FaTrash, FaSearch, FaTimes } from "react-icons/fa";

import { toast } from "react-toastify";

import PermissionSelector from "../../components/PermissionSelector";

import PermissionGuard from "../../components/PermissionGuard";

import { PERMISSIONS } from "../../constants/permissions";

import {
  getAllAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../api/adminApi";

export default function AdminManagement() {
  const [admins, setAdmins] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editId, setEditId] = useState(null);

  const initialForm = {
    name: "",

    email: "",

    phone: "",

    password: "",

    role: "STAFF",

    permissions: [],
  };

  const [form, setForm] = useState(initialForm);

  // =====================================
  // LOAD ADMINS
  // =====================================

  const fetchAdmins = async () => {
    try {
      setLoading(true);

      const response = await getAllAdmins();

      setAdmins(response.data?.data || response.data || []);
    } catch (error) {
      toast.error("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // =====================================
  // INPUT CHANGE
  // =====================================

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // =====================================
  // RESET FORM
  // =====================================

  const resetForm = () => {
    setEditId(null);

    setForm(initialForm);
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await updateAdmin(editId, form);

        toast.success("Admin updated successfully");
      } else {
        await createAdmin(form);

        toast.success("Admin created successfully");
      }

      setOpen(false);

      resetForm();

      fetchAdmins();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  // =====================================
  // EDIT
  // =====================================

  const handleEdit = (admin) => {
    setEditId(admin._id || admin.id);

    setForm({
      name: admin.name || "",

      email: admin.email || "",

      phone: admin.phone || "",

      password: "",

      role: admin.role || "STAFF",

      permissions: admin.permissions || [],
    });

    setOpen(true);
  };

  // =====================================
  // DELETE
  // =====================================

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this admin?");

    if (!confirm) return;

    try {
      await deleteAdmin(id);

      toast.success("Admin deleted");

      fetchAdmins();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // =====================================
  // SEARCH
  // =====================================

  const filteredAdmins = admins.filter((admin) => {
    const value = search.toLowerCase();

    return (
      admin.name?.toLowerCase().includes(value) ||
      admin.email?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="p-4 sm:p-6">
      {/* HEADER */}

      <div
        className="
flex
flex-col
sm:flex-row
justify-between
gap-4
mb-6
"
      >
        <h1
          className="
text-2xl
font-bold
"
        >
          Admin Management
        </h1>

        <PermissionGuard permission={PERMISSIONS.ADMIN_CREATE}>
          <button
            onClick={() => {
              resetForm();

              setOpen(true);
            }}
            className="
bg-blue-600
text-white
px-4
py-2
rounded-lg
flex
items-center
gap-2
"
          >
            <FaPlus />
            Add Admin
          </button>
        </PermissionGuard>
      </div>

      {/* SEARCH */}

      <div
        className="
relative
mb-5
"
      >
        <FaSearch
          className="
absolute
left-3
top-3
text-gray-400
"
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search admin..."
          className="
border
rounded-lg
pl-10
p-2
w-full
"
        />
      </div>

      {/* TABLE */}

      <div
        className="
bg-white
rounded-xl
shadow
overflow-x-auto
"
      >
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>

              <th className="p-3">Email</th>

              <th className="p-3">Role</th>

              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan="4"
                  className="
text-center
p-5
"
                >
                  Loading...
                </td>
              </tr>
            ) : (
              filteredAdmins.map((admin) => (
                <tr key={admin._id || admin.id} className="border-t">
                  <td className="p-3">{admin.name}</td>

                  <td className="p-3">{admin.email}</td>

                  <td className="p-3">
                    <span
                      className="
bg-blue-100
text-blue-700
px-3
py-1
rounded-full
text-sm
"
                    >
                      {admin.role}
                    </span>
                  </td>

                  <td
                    className="
p-3
flex
gap-3
"
                  >
                    <PermissionGuard permission={PERMISSIONS.ADMIN_UPDATE}>
                      <button
                        onClick={() => handleEdit(admin)}
                        className="
text-blue-600
"
                      >
                        <FaEdit />
                      </button>
                    </PermissionGuard>

                    <PermissionGuard permission={PERMISSIONS.ADMIN_DELETE}>
                      <button
                        onClick={() => handleDelete(admin._id || admin.id)}
                        className="
text-red-600
"
                      >
                        <FaTrash />
                      </button>
                    </PermissionGuard>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}

      {open && (
        <div
          className="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
z-50
"
        >
          <div
            className="
bg-white
rounded-xl
p-6
w-full
max-w-lg
"
          >
            <div
              className="
flex
justify-between
mb-5
"
            >
              <h2
                className="
text-xl
font-bold
"
              >
                {editId ? "Update Admin" : "Create Admin"}
              </h2>

              <button onClick={() => setOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="
space-y-3
"
            >
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="
border
p-2
w-full
rounded
"
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                className="
border
p-2
w-full
rounded
"
              />

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="
border
p-2
w-full
rounded
"
              />

              {!editId && (
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="
border
p-2
w-full
rounded
"
                />
              )}

              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="
border
p-2
w-full
rounded
"
              >
                <option value="STAFF">STAFF</option>

                <option value="ADMIN">ADMIN</option>
              </select>

              <PermissionSelector
                permissions={form.permissions}
                setPermissions={(value) =>
                  setForm({
                    ...form,

                    permissions: value,
                  })
                }
              />

              <PermissionGuard
                permission={
                  editId ? PERMISSIONS.ADMIN_UPDATE : PERMISSIONS.ADMIN_CREATE
                }
              >
                <button
                  className="
bg-blue-600
text-white
w-full
py-2
rounded
"
                >
                  {editId ? "Update Admin" : "Create Admin"}
                </button>
              </PermissionGuard>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
