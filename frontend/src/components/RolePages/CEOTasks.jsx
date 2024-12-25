import React from "react";

const CEOTasks = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">CEO Task Page</h2>
        <ul className="space-y-4">
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            View Company Metrics
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Manage High-Level Strategy
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            View All Team Members
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Approve Budget
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CEOTasks;
