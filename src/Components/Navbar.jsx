import React from "react";
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
          className="text-2xl font-bold text-blue-700 hover:text-blue-900 transition"
        >
          Home
        </NavLink>
      </div>

   
      <h1 className="text-xl md:text-3xl font-semibold text-blue-700 text-center">
        Welcome to My Blog
      </h1>

      <div className="flex items-center gap-4">
        {!user && (
          <NavLink
            to="/Login"
            className="btn bg-blue-700 hover:bg-blue-800 text-white border-none transition px-4 py-2"
          >
            Login
          </NavLink>
        )}
        {user && (
          <button
            onClick={handleLogout}
            className="btn bg-red-100 hover:bg-red-200 text-red-600 font-semibold border border-red-300 transition px-4 py-2"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
