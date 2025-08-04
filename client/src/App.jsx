import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import DashboardPage from "./pages/Dashboard";
import DashboardNavbar from "./pages/DashboardNavbar";
import OTPVerificationPage from "./pages/OTPVerificationPage";

import { AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const { getUserData, isLoggedIn, userData } = useContext(AppContext);

  // Fetch user data once logged in
  useEffect(() => {
    if (isLoggedIn) {
      getUserData();
    }
  }, [isLoggedIn]);

  // Redirect based on verification status
  useEffect(() => {
    if (isLoggedIn && userData) {
      if (!userData.isVerified && currentPage !== "email-verify") {
        setCurrentPage("email-verify");
      } else if (userData.isVerified && currentPage === "email-verify") {
        setCurrentPage("dashboard");
      }
    }
  }, [userData, currentPage, isLoggedIn]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-500 to-indigo-900">
      {/* Navigation */}
      {currentPage !== "dashboard" && (
        <Navbar setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <DashboardNavbar setCurrentPage={setCurrentPage} />
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      {/* Page Routing */}
      {currentPage === "home" && (
        <>
          <Header setCurrentPage={setCurrentPage} />
          <HomePage />
        </>
      )}
      {currentPage === "login" && <LoginPage setCurrentPage={setCurrentPage} />}
      {currentPage === "register" && (
        <RegisterPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "reset-password" && (
        <ResetPasswordPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "email-verify" && (
        <EmailVerify setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "dashboard" && (
        <DashboardPage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === "otp-verification" && (
        <OTPVerificationPage setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
};

export default App;
