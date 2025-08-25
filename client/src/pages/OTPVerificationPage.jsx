import React, { useState, useContext } from "react";
import { Lock, KeyRound, ShieldCheck, Mail } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const OTPVerificationPage = ({ setCurrentPage }) => {
  const { backendUrl, resetEmail } = useContext(AppContext);

  const [email, setEmail] = useState(resetEmail || ""); // ✅ fallback to context but allow manual entry
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyAndReset = async () => {
    if (!email || !otp || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/auth/reset-password`, {
        email,
        otp,
        newPassword,
      });

      if (res.data.success) {
        toast.success("Password reset successful!");
        setTimeout(() => setCurrentPage("login"), 2000); // ✅ redirect after success
      } else {
        toast.error(res.data.message || "Verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-indigo-900 to-purple-900">
      <div className="w-full max-w-md">
        <ToastContainer />
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          {/* Icon */}
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-indigo-100 rounded-full">
            <ShieldCheck className="w-8 h-8 text-indigo-600" />
          </div>

          {/* Title */}
          <h2 className="mb-2 text-3xl font-bold text-center text-gray-900">
            OTP Verification
          </h2>
          <p className="mb-6 text-sm text-center text-gray-600">
            Enter the details to reset your password
          </p>

          <div className="space-y-4">
            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                disabled={loading}
              />
            </div>

            {/* OTP */}
            <div className="relative">
              <KeyRound className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                disabled={loading}
              />
            </div>

            {/* New Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                disabled={loading}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleVerifyAndReset}
              disabled={loading}
              className={`w-full py-3 font-semibold text-white rounded-lg ${
                loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify & Reset Password"}
            </button>
          </div>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Back to{" "}
              <button
                onClick={() => setCurrentPage("login")}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationPage;
