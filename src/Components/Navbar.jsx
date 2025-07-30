import { NavLink } from "react-router";

import { toast } from "react-toastify";


export default function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    onLogout();

    toast.info("Logged out successfully!");

  };

  return (
    <nav className="navbar bg-white shadow-md px-6 py-3 flex justify-between items-center">
      
      <div className="flex items-center gap-4">
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 hover:scale-105 hover:underline transition-all duration-300 ease-in-out cursor-pointer relative group"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all duration-300 group-hover:w-full"></span>
        </NavLink>
      </div>

   
      <h1 className="text-xl md:text-3xl font-semibold text-blue-700 text-center">
        Welcome to My Blog
      </h1>

      <div className="flex items-center gap-4">
        {!user && (
          <NavLink
            to="/Login"
            className="btn bg-blue-700 hover:bg-blue-800 hover:scale-105 text-white border-none transition-all duration-300 ease-in-out px-4 py-2"
          >
            Login
          </NavLink>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="btn bg-red-100 hover:bg-red-200 hover:scale-105 text-red-600 font-semibold border border-red-300 transition-all duration-300 ease-in-out px-4 py-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
