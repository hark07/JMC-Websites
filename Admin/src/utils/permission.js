// =======================================
// Get Current Logged In Admin
// =======================================

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("admin"));
  } catch (error) {
    console.error("Error parsing admin data:", error);
    return null;
  }
};

// =======================================
// Single Permission Check
// =======================================

export const hasPermission = (permission) => {
  const user = getCurrentUser();

  if (!user) return false;

  // SUPER ADMIN => FULL ACCESS
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return user.permissions?.includes(permission) || false;
};

// =======================================
// Any Permission Check
// =======================================

export const hasAnyPermission = (permissions = []) => {
  const user = getCurrentUser();

  if (!user) return false;

  // SUPER ADMIN => FULL ACCESS
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.some((permission) =>
    user.permissions?.includes(permission),
  );
};

// =======================================
// All Permissions Check
// =======================================

export const hasAllPermissions = (permissions = []) => {
  const user = getCurrentUser();

  if (!user) return false;

  // SUPER ADMIN => FULL ACCESS
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.every((permission) =>
    user.permissions?.includes(permission),
  );
};
