import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  // Retrieve the role and name from localStorage
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate(); // Navigation hook to redirect to task page

  // Ensure the user is logged in and has a valid role
  if (!role || !name) {
    alert("You are not authorized to view this page. Please log in.");
    navigate("/login"); // Redirect to login if role or name is not found
  }

  // Define role-based options and actions
  const roleDetails = {
    CEO: {
      options: [
        "View Company Metrics",
        "Manage High-Level Strategy",
        "View All Team Members",
        "Approve Budget",
      ],
      action: "You can access company-wide performance metrics.",
      taskPath: "/ceo-tasks",
    },
    Manager: {
      options: [
        "Assign Tasks to Team Leaders",
        "View Team Performance",
        "Schedule Meetings",
        "Manage Projects",
      ],
      action: "You can assign tasks and monitor team progress.",
      taskPath: "/manager-tasks",
    },
    "Team Leader": {
      options: [
        "Distribute Tasks to Team Members",
        "Track Task Progress",
        "Report to Manager",
        "Review Team Outputs",
      ],
      action: "You can review tasks and lead your team effectively.",
      taskPath: "/team-leader-tasks",
    },
    "Team Member": {
      options: [
        "View Assigned Tasks",
        "Submit Task Updates",
        "Request Feedback",
        "Collaborate with Team",
      ],
      action: "You can manage your assigned tasks.",
      taskPath: "/team-member-tasks",
    },
  };

  const currentRoleDetails = roleDetails[role] || {
    options: ["No options available"],
    action: "No specific actions available for your role.",
    taskPath: null,
  };

  // Function to redirect to the correct task page
  const handleTaskClick = () => {
    if (currentRoleDetails.taskPath) {
      navigate(currentRoleDetails.taskPath);
    } else {
      alert("No tasks available");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome, {name} ({role})
        </h2>
        <p className="text-lg text-center text-gray-700 mb-4">
          {currentRoleDetails.action}
        </p>
        <ul className="space-y-4">
          {currentRoleDetails.options.map((option, index) => (
            <li
              key={index}
              className="p-4 bg-blue-100 text-blue-800 rounded hover:bg-blue-200 cursor-pointer text-center"
              onClick={handleTaskClick}
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
