import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ToastContainer } from "react-toastify";
import { AppContext } from "../context/AppContext";
import DashboardNavbar from "../pages/DashboardNavbar"; // Adjust path if needed

const DashboardPage = ({ userName }) => {
  const { backendUrl } = useContext(AppContext);

  const accountBalance = 105000.75;

  const transactions = [
    { id: 1, type: "Deposit", amount: 50000, date: "2025-07-29" },
    { id: 2, type: "Withdraw", amount: 15000, date: "2025-07-27" },
    { id: 3, type: "Transfer", amount: 10000, date: "2025-07-25" },
  ];

  const spendingData = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 15000 },
    { month: "Mar", amount: 9000 },
    { month: "Apr", amount: 20000 },
    { month: "May", amount: 18000 },
    { month: "Jun", amount: 14000 },
  ];

  const getTxnIcon = (type) => {
    switch (type) {
      case "Deposit":
        return <span className="text-green-500">⬇️</span>;
      case "Withdraw":
        return <span className="text-red-500">⬆️</span>;
      case "Transfer":
        return <span className="text-yellow-500">➡️</span>;
      default:
        return null;
    }
  };

  const getAmountColor = (type) => {
    switch (type) {
      case "Deposit":
        return "text-green-600";
      case "Withdraw":
        return "text-red-600";
      case "Transfer":
        return "text-yellow-600";
      default:
        return "text-gray-800";
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />

      <div className="min-h-screen px-4 py-8 bg-gradient-to-tr from-indigo-50 to-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="mb-8 text-4xl font-extrabold text-gray-900">
            Welcome back,{" "}
            <span className="text-indigo-600">{userName || "Maneka.."}</span>!
          </h1>

          {/* Balance and Chart */}
          <div className="flex flex-col mb-10 md:flex-row md:space-x-6">
            <div className="flex-1 p-6 bg-white border border-indigo-200 shadow-lg rounded-xl">
              <h2 className="mb-3 text-lg font-semibold text-gray-700">
                Current Account Balance
              </h2>
              <p className="text-4xl font-bold text-indigo-700">
                Rs. {accountBalance.toLocaleString()}
              </p>
              <button
                className="px-6 py-3 mt-6 font-medium text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-700"
                onClick={() => alert("Transfer page coming soon")}
              >
                Transfer Money
              </button>
            </div>

            {/* Monthly Spending Chart */}
            <div className="flex-1 p-6 mt-8 bg-white border border-indigo-200 shadow-lg md:mt-0 rounded-xl">
              <h2 className="mb-4 text-lg font-semibold text-gray-700">
                Monthly Spending
              </h2>
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                  <BarChart data={spendingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="amount"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="p-6 bg-white border border-indigo-200 shadow-lg rounded-xl">
            <h2 className="mb-6 text-lg font-semibold text-gray-700">
              Recent Transactions
            </h2>
            <ul>
              {transactions.map((txn) => (
                <li
                  key={txn.id}
                  className="flex items-center justify-between py-3 border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-100 rounded-full">
                      {getTxnIcon(txn.type)}
                    </div>
                    <span className="font-medium text-gray-800">
                      {txn.type}
                    </span>
                  </div>
                  <span className={`font-semibold ${getAmountColor(txn.type)}`}>
                    Rs. {txn.amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500">{txn.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
