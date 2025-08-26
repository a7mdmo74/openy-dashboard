"use client";
import { useState } from "react";
import { ChevronRight, Send } from "lucide-react";
import Image from "next/image";

export default function QuickTransfer() {
  const [selectedUser, setSelectedUser] = useState(0);
  const [amount, setAmount] = useState("525.50");

  const users = [
    {
      id: 1,
      name: "Livia Bator",
      role: "CEO",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=80&h=80&fit=crop&crop=face",
    },
    {
      id: 2,
      name: "Randy Press",
      role: "Director",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    },
    {
      id: 3,
      name: "Workman",
      role: "Designer",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
    },
  ];

  const handleUserSelect = (index: number) => {
    setSelectedUser(index);
  };

  const handleSend = () => {
    const selectedUserData = users[selectedUser];
    alert(`Sending $${amount} to ${selectedUserData.name}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-sm">
      <h3 className="text-xl font-semibold text-gray-800 mb-6">
        Quick Transfer
      </h3>

      {/* User Selection */}
      <div className="relative mb-6">
        <div className="flex items-center space-x-4 overflow-x-auto pb-2">
          {users.map((user, index) => (
            <div
              key={user.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-200 flex-shrink-0 ${
                selectedUser === index ? "transform scale-105" : ""
              }`}
              onClick={() => handleUserSelect(index)}
            >
              <div
                className={`relative mb-2 ${
                  selectedUser === index
                    ? "ring-2 ring-blue-500 ring-offset-2 rounded-full"
                    : ""
                }`}
              >
                {/* <Image
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                /> */}
              </div>
              <div className="text-center">
                <p
                  className={`text-sm font-semibold ${
                    selectedUser === index ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {user.name}
                </p>
                <p
                  className={`text-xs ${
                    selectedUser === index ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {user.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Next Arrow */}
        <button className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full p-2 hover:shadow-lg transition-shadow duration-200">
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      </div>

      {/* Amount Input and Send Button */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-1">
            Write Amount
          </label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full text-lg font-semibold text-gray-800 bg-transparent border-none outline-none"
            placeholder="0.00"
          />
        </div>

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center space-x-2 transition-colors duration-200 font-medium"
        >
          <span>Send</span>
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
