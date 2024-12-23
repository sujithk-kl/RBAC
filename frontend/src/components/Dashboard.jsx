import React from "react";

const Dashboard = () => {
  // Retrieve the role and name from localStorage
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  // Define role-based options and actions
  const getOptionsByRole = (role) => {
    switch (role) {
      case "CEO":
        return [
          "View Company Metrics",
          "Manage High-Level Strategy",
          "View All Team Members",
          "Approve Budget",
        ];
      case "Manager":
        return [
          "Assign Tasks to Team Leaders",
          "View Team Performance",
          "Schedule Meetings",
          "Manage Projects",
        ];
      case "Team Leader":
        return [
          "Distribute Tasks to Team Members",
          "Track Task Progress",
          "Report to Manager",
          "Review Team Outputs",
        ];
      case "Team Member":
        return [
          "View Assigned Tasks",
          "Submit Task Updates",
          "Request Feedback",
          "Collaborate with Team",
        ];
      default:
        return ["No options available"];
    }
  };

  const getActionsByRole = (role) => {
    switch (role) {
      case "CEO":
        return "You can access company-wide performance metrics.";
      case "Manager":
        return "You can assign tasks and monitor team progress.";
      case "Team Leader":
        return "You can review tasks and lead your team effectively.";
      case "Team Member":
        return "You can manage your assigned tasks.";
      default:
        return "No specific actions available for your role.";
    }
  };

  const options = getOptionsByRole(role);
  const actions = getActionsByRole(role);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome, {name} ({role})
        </h2>
        <p className="text-lg text-center text-gray-700 mb-4">{actions}</p>
        <ul className="space-y-4">
          {options.map((option, index) => (
            <li
              key={index}
              className="p-4 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 cursor-pointer text-center"
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
