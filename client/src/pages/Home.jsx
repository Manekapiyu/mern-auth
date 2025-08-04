import React, { useState } from "react";
import { Shield, Zap, Heart } from "lucide-react";

const colorClasses = {
  blue: {
    bg: "bg-blue-600",
    border: "border-blue-800",
    iconBg: "bg-blue-500",
    iconText: "text-blue-600",
  },
  green: {
    bg: "bg-green-600",
    border: "border-green-800",
    iconBg: "bg-green-500",
    iconText: "text-green-600",
  },
  purple: {
    bg: "bg-purple-600",
    border: "border-purple-800",
    iconBg: "bg-purple-500",
    iconText: "text-purple-600",
  },
};

const boxes = [
  {
    id: "security",
    title: "Bank-Grade Security",
    desc: "256-bit encryption, biometric authentication, and real-time fraud monitoring.",
    icon: Shield,
    color: "blue",
  },
  {
    id: "transfers",
    title: "Instant Transfers",
    desc: "Send money instantly with zero fees to friends, family, and businesses.",
    icon: Zap,
    color: "green",
  },
  {
    id: "healthcare",
    title: "Healthcare Ready",
    desc: "HIPAA compliant for medical payments and healthcare financial management.",
    icon: Heart,
    color: "purple",
  },
];

const HomePage = () => {
  const [selectedBox, setSelectedBox] = useState(null);

  return (
    <div className="min-h-screen px-6 py-20 bg-blue-100 sm:px-12 lg:px-20">
      <h2 className="mb-10 text-3xl font-bold text-center text-indigo-700 drop-shadow">
        Why Choose Secure Banking?
      </h2>
      <div className="grid gap-10 md:grid-cols-3">
        {boxes.map(({ id, title, desc, icon: Icon, color }) => {
          const isSelected = selectedBox === id;
          const colorClass = colorClasses[color];

          return (
            <div
              key={id}
              onClick={() => setSelectedBox(id)}
              className={`cursor-pointer p-8 rounded-2xl transition-all duration-300 border shadow-xl ${
                isSelected
                  ? `${colorClass.bg} ${colorClass.border}`
                  : "bg-white border-gray-200"
              } hover:shadow-2xl`}
            >
              <div
                className={`flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full ${
                  isSelected ? "bg-white" : colorClass.iconBg
                }`}
              >
                <Icon
                  className={`w-8 h-8 ${
                    isSelected ? colorClass.iconText : "text-white"
                  }`}
                />
              </div>
              <h3
                className={`mb-4 text-xl font-semibold text-center ${
                  isSelected ? "text-white" : "text-gray-900"
                }`}
              >
                {title}
              </h3>
              <p
                className={`text-center ${
                  isSelected ? "text-white" : "text-gray-700"
                }`}
              >
                {desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
