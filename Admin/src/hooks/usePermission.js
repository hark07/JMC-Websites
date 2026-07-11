import { useAuth } from "../context/AuthContext";

export default function usePermission() {
  const { user } = useAuth();

  // ==============================
  // ROLE
  // ==============================

  const role = user?.role;

  // ==============================
  // PERMISSIONS
  // ==============================

  const permissions = user?.permissions || [];

  // ==============================
  // SUPER ADMIN
  // FULL ACCESS
  // ==============================

  const isSuperAdmin = role === "SUPER_ADMIN";

  // ==============================
  // CHECK ONE PERMISSION
  // ==============================

  const hasPermission = (permission) => {
    if (isSuperAdmin) {
      return true;
    }

    return permissions.includes(permission);
  };

  // ==============================
  // CHECK MULTIPLE
  // ==============================

  const hasAnyPermission = (permissionList) => {
    if (isSuperAdmin) {
      return true;
    }

    return permissionList.some((permission) =>
      permissions.includes(permission),
    );
  };

  const hasAllPermissions = (permissionList) => {
    if (isSuperAdmin) {
      return true;
    }

    return permissionList.every((permission) =>
      permissions.includes(permission),
    );
  };

  return {
    role,

    permissions,

    isSuperAdmin,

    hasPermission,

    hasAnyPermission,

    hasAllPermissions,
  };
}
