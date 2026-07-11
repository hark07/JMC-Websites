import ProtectedRoute from "./ProtectedRoute";

export default function RequirePermission({
  children,
  permissions = [],
  roles = [],
}) {
  return (
    <ProtectedRoute permissions={permissions} roles={roles}>
      {children}
    </ProtectedRoute>
  );
}
