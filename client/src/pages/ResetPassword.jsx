import React from 'react'
import { ArrowLeft, Mail, AlertCircle } from 'lucide-react';

const ResetPasswordPage = ({ setCurrentPage }) => (
  <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 to-indigo-900">
    <div className="w-full max-w-md">
      <div className="p-8 bg-white shadow-2xl rounded-2xl">
        <button onClick={() => setCurrentPage('login')} className="flex items-center mb-6 text-gray-600 hover:text-gray-800">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Login
        </button>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <Mail className="w-8 h-8 text-purple-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-gray-600">We'll send you a secure verification code</p>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-gray-400" />
            <input type="text" className="w-full py-3 pl-10 pr-4 border rounded-lg" placeholder="Email or Phone" />
          </div>

          <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
              <div className="text-sm text-blue-800">
                <p className="mb-1 font-semibold">Security Notice</p>
                <p>We’ll send a 6-digit OTP code before allowing password reset.</p>
              </div>
            </div>
          </div>

          <button onClick={() => setCurrentPage('otp-verification')} className="w-full py-3 font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700">
            Send Verification Code
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-600">Remember your password? <button onClick={() => setCurrentPage('login')} className="font-semibold text-purple-600 hover:text-purple-800">Sign in</button></p>
        </div>
      </div>
    </div>
  </div>
);

export default ResetPasswordPage;

