import React from "react";

const Dashboard = () => {
  // Retrieve the role and name from localStorage
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome, {role} {name}</h2>
      </div>
    </div>
  );
};

export default Dashboard;
