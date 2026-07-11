import usePermission from "../hooks/usePermission";

export default function PermissionGuard({
  permission,
  permissions = [],
  children,
  fallback = null,
}) {
  const { hasPermission, hasAnyPermission, hasAllPermissions } =
    usePermission();

  // ==============================
  // SINGLE PERMISSION
  // ==============================

  if (permission) {
    return hasPermission(permission) ? children : fallback;
  }

  // ==============================
  // ANY PERMISSION
  // ==============================

  if (permissions.length > 0) {
    return hasAnyPermission(permissions) ? children : fallback;
  }

  // ==============================
  // NO CHECK
  // ==============================

  return children;
}
