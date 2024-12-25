import React from "react";

const TeamMemberTasks = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Team Member Task Page</h2>
        <ul className="space-y-4">
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            View Assigned Tasks
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Submit Task Updates
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Request Feedback
          </li>
          <li className="p-4 bg-blue-100 text-blue-800 rounded text-center">
            Collaborate with Team
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamMemberTasks;
