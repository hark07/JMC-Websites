export const hasPermission = (user, permission) => {
  if (!user) return false;

  // SUPER ADMIN ALL ACCESS

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return user.permissions?.includes(permission);
};

export const hasAnyPermission = (user, permissions = []) => {
  if (!user) return false;

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.some((permission) =>
    user.permissions?.includes(permission),
  );
};

export const hasAllPermissions = (user, permissions = []) => {
  if (!user) return false;

  if (user.role === "SUPER_ADMIN") {
    return true;
  }

  return permissions.every((permission) =>
    user.permissions?.includes(permission),
  );
};
