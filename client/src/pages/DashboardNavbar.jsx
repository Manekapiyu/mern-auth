import React from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";

const DashboardNavbar = ({ setCurrentPage }) => {

  const handleLogout = async () => {
    try {
      // Optional backend logout (ignore failure)
      await axios.post("http://localhost:4000/api/logout");
    } catch (err) {
      console.warn("Backend logout failed (proceeding anyway):", err);
    }

    // Always clear token and redirect
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");

    setTimeout(() => {
      setCurrentPage("home"); // Use the prop to navigate back to home page
    }, 1000);
  };

  return (
    <nav className="border border-blue-200 bg-gradient-to-r from-blue-100 via-white to-blue-100 backdrop-blur-md">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <img
              src={Logo}
              alt="Logo"
              className="object-contain w-16 h-16 mix-blend-multiply"
            />
            <span className="text-2xl font-bold text-blue-600">SecureBank</span>
          </div>

          {/* Logout Button */}
          <div>
            <button
              onClick={handleLogout}
              className="px-5 py-2 font-semibold text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
