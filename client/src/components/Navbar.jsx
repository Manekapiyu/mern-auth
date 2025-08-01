import React from "react";
import { Shield } from "lucide-react";
import Logo from "../assets/logo.png";

const Navbar = ({ setCurrentPage }) => (
  <nav className="border border-blue-200 bg-gradient-to-r from-blue-100 via-white to-blue-100 backdrop-blur-md">
    <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={Logo} alt="Logo" className="object-contain w-20 h-20 mix-blend-multiply" />

      
          <span className="text-xl font-bold text-blue-600">SecureBank</span>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={() => setCurrentPage("login")}
            className="px-4 py-2 font-semibold text-blue-600 transition-colors duration-300 rounded-lg hover:text-blue-900"
          >
            Login
          </button>

          <button
            onClick={() => setCurrentPage("register")}
            className="px-6 py-2 font-semibold text-blue-600 transition-all duration-300 bg-white rounded-lg shadow-sm hover:bg-blue-100"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </nav>
);

export default Navbar;
