import React, { useContext, useState } from "react";
import Logo from "../assets/logo.png";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const DashboardNavbar = ({ setCurrentPage }) => {
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`
      );

      if (data.success) {
        toast.success(data.message);
        setCurrentPage("email-verify"); 
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error sending OTP: " + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${backendUrl}/api/logout`);
    } catch (err) {
      console.warn("Backend logout failed (proceeding anyway):", err);
    }

    localStorage.removeItem("token");
    setUserData(null);
    setIsLoggedin(false);
    toast.success("Logged out successfully!");

    setTimeout(() => {
      setCurrentPage("home");
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
            <span className="text-2xl font-bold text-blue-600">Banklytix</span>
          </div>

          {userData && (
            <div className="relative">
              <div
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center justify-center w-10 h-10 text-white bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700"
              >
                {userData.name
                  ? userData.name.charAt(0).toUpperCase()
                  : userData.email.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div className="absolute right-0 z-50 w-48 mt-2 bg-white border rounded shadow-md">
                  {!userData.isAccountVerified && (
                    <button
                      onClick={() => {
                        setShowDropdown(false);
                        sendVerificationOtp(); 
                      }}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-blue-100"
                    >
                      Verify Email
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      handleLogout();
                    }}
                    className="block w-full px-4 py-2 text-sm text-left hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
