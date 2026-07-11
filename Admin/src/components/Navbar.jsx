import { FaBars, FaBell, FaUser, FaSignOutAlt, FaKey } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

const Navbar = ({ setOpen }) => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();

    navigate("/login");
  };

  return (
    <header
      className="
fixed
top-0
right-0
left-0
lg:left-64
z-30
flex
h-16
items-center
justify-between
border-b
bg-white
px-4
shadow-sm
sm:px-6
"
    >
      {/* LEFT */}

      <div className="flex items-center gap-4">
        <button className="text-xl lg:hidden" onClick={() => setOpen(true)}>
          <FaBars />
        </button>

        <h2
          className="
text-lg
font-semibold
sm:text-xl
"
        >
          Dashboard
        </h2>
      </div>

      {/* RIGHT */}

      <div
        className="
flex
items-center
gap-3
sm:gap-5
"
      >
        {/* Notification */}

        <button
          className="
rounded-full
p-2
hover:bg-gray-100
"
        >
          <FaBell className="text-lg" />
        </button>

        {/* User */}

        <div
          className="
hidden
sm:flex
items-center
gap-2
rounded-full
bg-gray-100
px-3
py-2
"
        >
          <FaUser />

          <div className="flex flex-col">
            <span
              className="
text-sm
font-semibold
"
            >
              {user?.name || "Admin"}
            </span>

            <span
              className="
text-xs
text-gray-500
"
            >
              {user?.email}
            </span>
          </div>
        </div>

        {/* CHANGE PASSWORD */}

        <button
          onClick={() => navigate("/change-password")}
          className="
flex
items-center
gap-2
rounded-lg
bg-blue-500
px-3
py-2
text-white
hover:bg-blue-600
transition
"
        >
          <FaKey />

          <span
            className="
hidden
sm:block
"
          >
            Password
          </span>
        </button>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          className="
flex
items-center
gap-2
rounded-lg
bg-red-500
px-3
py-2
text-white
hover:bg-red-600
transition
"
        >
          <FaSignOutAlt />

          <span
            className="
hidden
sm:block
"
          >
            Logout
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
