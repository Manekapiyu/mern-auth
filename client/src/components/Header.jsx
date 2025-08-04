import React from "react";

const Header = ({ setCurrentPage }) => (
  <div className="relative px-6 py-32 mx-auto text-center shadow-xl sm:px-12 lg:px-20 bg-gradient-to-b from-blue-700 via-blue-600 to-indigo-700 ">
    <h1 className="mb-8 text-5xl font-extrabold text-white md:text-6xl drop-shadow-lg">
      Secure Banking
      <span className="block mt-2 text-blue-200">Powering Your Operations</span>
    </h1>
    <p className="max-w-3xl mx-auto mb-16 text-lg text-blue-200 sm:text-xl drop-shadow">
      Delivering reliable, secure backend infrastructure with seamless
      transaction processing and robust data protection.
    </p>

    <div className="flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-center">
      <button
        onClick={() => setCurrentPage("register")}
        className="px-10 py-4 text-lg font-semibold text-blue-900 transition-all duration-300 transform bg-white shadow-lg rounded-xl hover:bg-blue-50 hover:scale-105"
      >
        Get Started Free
      </button>
      <button
        onClick={() => setCurrentPage("login")}
        className="px-10 py-4 text-lg font-semibold text-white transition-all duration-300 border-2 border-white rounded-xl hover:bg-white hover:text-blue-900"
      >
        Sign In
      </button>
    </div>
  </div>
);

export default Header;
