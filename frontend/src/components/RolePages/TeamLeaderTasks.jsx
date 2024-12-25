import React from "react";

const TeamLeaderTasks = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Team Leader Task Page</h2>
        <ul className="space-y-4">
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Distribute Tasks to Team Members
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Track Task Progress
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Report to Manager
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Review Team Outputs
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamLeaderTasks;
