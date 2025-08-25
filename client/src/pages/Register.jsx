import React, { useContext, useState } from "react";
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const RegisterPage = ({ setCurrentPage }) => {
  const { backendUrl } = useContext(AppContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (!termsAccepted) {
      return toast.error("Please accept the Terms and Privacy Policy");
    }

    try {
      setLoading(true);
      console.log("➡️ Sending register request to:", `${backendUrl}/api/auth/register`);

      const { data } = await axios.post(
        `${backendUrl}/api/auth/register`,
        { name, email, password },
        { withCredentials: true }
      );

      console.log(" Register Response:", data);

      if (data?.success || data?.status === "ok") {
        toast.success(data.message || "Check your email for verification");
        setTimeout(() => setCurrentPage("login"), 800);
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(" Register Error:", {
        message: err.message,
        code: err.code,
        url: err.config?.url,
        response: err.response?.data,
      });

      toast.error(err?.response?.data?.message || "Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 overflow-y-auto bg-gradient-to-br from-green-900 to-blue-900">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          {/* Back Button */}
          <button
            onClick={() => setCurrentPage("home")}
            className="flex items-center mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </button>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mx-auto mb-2 bg-green-100 rounded-full w-14 h-14">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our secure platform</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <User className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="name"
                type="text"
                placeholder="Full Name"
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email Address
              </label>
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full py-3 pl-10 pr-10 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                className="mt-1 mr-2"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setCurrentPage("login")}
                  className="font-semibold text-green-600"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
