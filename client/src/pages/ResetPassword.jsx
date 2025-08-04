import React, { useState, useContext } from "react";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const ResetPasswordPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl, setResetEmail } = useContext(AppContext);

  // Simple email regex for validation
  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSendOtp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error("Please enter your email.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/auth/send-reset-otp`, {
        email: trimmedEmail,
      });

      if (res.data.success) {
        toast.success("OTP sent to your email");
        setResetEmail(trimmedEmail);
        setCurrentPage("otp-verification"); // Navigate on success only
      } else {
        toast.error(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 to-indigo-900">
      <div className="w-full max-w-md">
        <ToastContainer />
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <button
            onClick={() => setCurrentPage("login")}
            className="flex items-center mb-6 text-gray-600 hover:text-gray-800"
            type="button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
          </button>

          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
            <p className="mt-2 text-gray-600">
              We'll send you a secure verification code
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                placeholder="Enter your email"
                disabled={loading}
                aria-label="Email address"
              />
            </div>

            <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                <div className="text-sm text-blue-800">
                  <p className="mb-1 font-semibold">Security Notice</p>
                  <p>
                    We’ll send a 6-digit OTP code before allowing password
                    reset.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendOtp}
              disabled={loading}
              aria-disabled={loading}
              className={`w-full py-3 font-semibold text-white rounded-lg ${
                loading
                  ? "bg-purple-400 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => setCurrentPage("otp-verification")}
                className="font-semibold text-purple-600 hover:text-purple-800"
                type="button"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
