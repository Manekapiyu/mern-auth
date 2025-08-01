import React, { useContext, useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { AppContext } from '../context/AppContext';

const RegisterPage = ({ setCurrentPage }) => {
  const { backendUrl } = useContext(AppContext); // ✅ Pull from context
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message || "Check your email for verification");
        setCurrentPage('login');
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 overflow-y-auto bg-gradient-to-br from-green-900 to-blue-900">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center mb-6 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </button>

          <div className="mb-8 text-center">
            <div className="flex items-center justify-center mx-auto mb-2 bg-green-100 rounded-full w-14 h-14">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
            <p className="mt-2 text-gray-600">Join our secure platform</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" />
              <input 
                type="text"
                placeholder="Full Name"
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full py-3 pl-10 pr-4 border rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full py-3 pl-10 pr-10 border rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5"
              >
                {showPassword ? (
                  <EyeOff className="text-gray-400" />
                ) : (
                  <Eye className="text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="mt-1 mr-2" />
              <span className="text-sm text-gray-600">
                I agree to the Terms and Privacy Policy
              </span>
            </div>

            <button
              onClick={handleRegister}
              className="w-full py-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login')}
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
