import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const EmailVerify = ({ setCurrentPage }) => {
  const [emailCode, setEmailCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60); // countdown timer
  const { backendUrl } = useContext(AppContext);

  // Countdown timer for resend button
  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  // Handle input change per box
  const handleEmailCodeChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...emailCode];
      newCode[index] = value;
      setEmailCode(newCode);
      if (value && index < 5) {
        const nextInput = document.getElementById(`email-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  // Verify code
  const handleVerify = async () => {
    const code = emailCode.join("");
    if (code.length !== 6) {
      toast.error("Enter all 6 digits");
      return;
    }

    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/send-verify-otp`,
        { code },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Email verified!");
        setCurrentPage("dashboard"); // ✅ Redirect on success
      } else {
        toast.error(res.data.message || "Verification failed.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    }
  };

  // Resend OTP
  const handleResend = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/resend-otp`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("OTP resent successfully");
        setResendTimer(60); // reset countdown
      } else {
        toast.error(res.data.message || "Failed to resend OTP");
      }
    } catch {
      toast.error("Server error while resending OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-teal-900 to-cyan-900">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Verify Your Email
            </h2>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              john@example.com
            </p>
          </div>

          <div className="flex justify-center mb-6 space-x-3">
            {emailCode.map((digit, index) => (
              <input
                key={index}
                id={`email-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                autoFocus={index === 0}
                onChange={(e) => handleEmailCodeChange(index, e.target.value)}
                className="w-12 h-12 text-xl font-bold text-center border-2 border-teal-500 rounded-lg"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full py-3 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            Verify Email Address
          </button>

          <div className="mt-6 text-sm text-center text-gray-600">
            Didn’t receive email?{" "}
            <button
              onClick={handleResend}
              disabled={resendTimer > 0}
              className={`font-semibold ${
                resendTimer > 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-teal-600"
              }`}
            >
              Resend {resendTimer > 0 && `(${resendTimer}s)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
