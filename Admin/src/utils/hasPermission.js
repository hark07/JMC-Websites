// =======================================
// RBAC Permission Helper
// =======================================

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("admin"));
  } catch (error) {
    return null;
  }
};

// =======================================
// Single Permission
// =======================================

export const hasPermission = (permission) => {
  const user = getCurrentUser();

  if (!user) return false;

  // SUPER ADMIN -> ALL ACCESS
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return user.permissions?.includes(permission);
};

// =======================================
// Any Permission
// =======================================

export const hasAnyPermission = (permissions = []) => {
  const user = getCurrentUser();

  if (!user) return false;

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.some((permission) =>
    user.permissions?.includes(permission),
  );
};

// =======================================
// All Permissions
// =======================================

export const hasAllPermissions = (permissions = []) => {
  const user = getCurrentUser();

  if (!user) return false;

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.every((permission) =>
    user.permissions?.includes(permission),
  );
};
