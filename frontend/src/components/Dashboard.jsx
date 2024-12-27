import React from "react";
import { useNavigate } from "react-router-dom";
import dashboardImage from "../components/login.jpg"; // Adjust path if necessary

const Dashboard = () => {
  // Retrieve the role and name from localStorage
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");
  const navigate = useNavigate(); // Navigation hook to redirect

  // Ensure the user is logged in and has a valid role
  if (!role || !name) {
    alert("You are not authorized to view this page. Please log in.");
    navigate("/login"); // Redirect to login if role or name is not found
  }

  // Define the task path based on the user's role
  const roleTaskPaths = {
    CEO: "/ceo-tasks",
    Manager: "/manager-tasks",
    "Team Leader": "/team-leader-tasks",
    "Team Member": "/team-member-tasks",
  };

  const taskPath = roleTaskPaths[role] || "/tasks";

  // Function to redirect to the appropriate task page
  const handleDashboardClick = () => {
    navigate(taskPath); // Redirect to the role-specific task page
  };

  return (
    <div
      className="flex justify-end items-center min-h-screen"
      style={{
        backgroundImage: `url(${dashboardImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg bg-opacity-80 mr-80">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome, {name}
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Access your personalized dashboard with role-specific tasks.
        </p>
        <button
          onClick={handleDashboardClick}
          className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
