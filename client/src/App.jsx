import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ResetPasswordPage from "./pages/ResetPassword";
import EmailVerify from "./pages/EmailVerify";
import DashboardPage from "./pages/Dashboard"; // ✅ Import this
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardNavbar from "./pages/DashboardNavbar";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-500 to-indigo-900">

  {/* Show main Navbar only if NOT on dashboard */}
  {currentPage !== "dashboard" && (
    <Navbar setCurrentPage={setCurrentPage} />
  )}

  {/* Show Dashboard Navbar ONLY on dashboard */}
  {currentPage === "dashboard" && (
    <DashboardNavbar setCurrentPage={setCurrentPage} />
  )}

  <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

     

      {currentPage === "home" && (
        <>
          <Header setCurrentPage={setCurrentPage} />
          <HomePage />
        </>
      )}

      {currentPage === "login" && (
        <LoginPage setCurrentPage={setCurrentPage} />
      )}

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
    </div>
  );
};

export default App;
