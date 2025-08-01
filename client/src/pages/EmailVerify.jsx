import React from 'react';
import { Mail, CheckCircle } from 'lucide-react';

const EmailVerificationPage = ({  handleLogin }) => {
  const [emailCode, setEmailCode] = React.useState(['', '', '', '', '', '']);

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

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-teal-900 to-cyan-900">
      <div className="w-full max-w-md">
        <div className="p-8 bg-white shadow-2xl rounded-2xl">
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-teal-100 rounded-full">
              <Mail className="w-8 h-8 text-teal-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
            <p className="mt-1 text-sm font-semibold text-gray-800">john@example.com</p>
          </div>

          <div className="flex justify-center mb-6 space-x-3">
            {emailCode.map((digit, index) => (
              <input
                key={index}
                id={`email-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleEmailCodeChange(index, e.target.value)}
                className="w-12 h-12 text-xl font-bold text-center border-2 rounded-lg"
              />
            ))}
          </div>

          <button onClick={handleLogin} className="w-full py-3 font-semibold text-white bg-teal-600 rounded-lg hover:bg-teal-700">
            Verify Email Address
          </button>

          <div className="mt-6 text-sm text-center text-gray-600">
            Didn’t receive email? <button className="font-semibold text-teal-600">Resend</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
