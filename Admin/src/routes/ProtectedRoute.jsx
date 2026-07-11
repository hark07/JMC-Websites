import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({
  children,

  roles = [],

  permissions = [],
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role === "SUPER_ADMIN") {
    return children;
  }

  if (roles.length && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  if (permissions.length) {
    const allowed = permissions.every((p) => user.permissions?.includes(p));

    if (!allowed) {
      return <Navigate to="/" />;
    }
  }

  return children;
}
