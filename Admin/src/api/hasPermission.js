export const hasPermission = (user, permission) => {
  if (!user) return false;

  // SUPER ADMIN
  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return (user.permissions || []).includes(permission);
};

export const hasRole = (user, role) => {
  if (!user) return false;

  return user.role === role;
};
