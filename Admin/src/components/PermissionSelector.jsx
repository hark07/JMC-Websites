import { PERMISSIONS } from "../constants/permissions";

const permissionList = Object.entries(PERMISSIONS).map(([key, value]) => ({
  label: key.replaceAll("_", " "),
  value,
}));

export default function PermissionSelector({ permissions, setPermissions }) {
  const togglePermission = (permission) => {
    if (permissions.includes(permission)) {
      setPermissions(permissions.filter((item) => item !== permission));
    } else {
      setPermissions([...permissions, permission]);
    }
  };

  return (
    <div>
      <h3
        className="
font-semibold
mb-3
"
      >
        Permissions
      </h3>

      <div
        className="
grid
grid-cols-2
gap-3
max-h-60
overflow-y-auto
border
p-3
rounded
"
      >
        {permissionList.map((item) => (
          <label
            key={item.value}
            className="
flex
items-center
gap-2
text-sm
"
          >
            <input
              type="checkbox"
              checked={permissions.includes(item.value)}
              onChange={() => togglePermission(item.value)}
            />

            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
