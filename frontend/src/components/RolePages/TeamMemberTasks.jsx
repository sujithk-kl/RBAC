import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TeamMemberTasks = () => {
  const [taskUpdate, setTaskUpdate] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Submit Task Updates
  const handleSubmitTaskUpdate = (e) => {
    e.preventDefault();

    // Retrieve existing updates from localStorage or initialize empty array
    const storedUpdates = JSON.parse(localStorage.getItem("taskUpdates")) || [];
    const newUpdate = {
      id: Date.now(), // Unique identifier
      content: taskUpdate,
      submittedAt: new Date().toLocaleString(), // Timestamp of submission
    };

    // Save the new update to localStorage
    localStorage.setItem("taskUpdates", JSON.stringify([...storedUpdates, newUpdate]));

    alert(`Task update submitted: ${taskUpdate}`);
    setTaskUpdate(""); // Clear input field
  };

  // Logout function to clear session and redirect to login page
  const handleLogout = () => {
    // Clear localStorage or sessionStorage (or other session-related data)
    localStorage.removeItem("taskUpdates");
    // Optionally remove other session data (e.g., user information, authentication tokens)

    // Navigate to the login page
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-8 sm:px-10 lg:px-12 bg-gradient-to-r from-blue-900 via-green-800 to-teal-700">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#16a085] rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Team Member Dashboard
        </h2>

        {/* Logout Button */}
        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={handleLogout} // Make sure the logout handler is used
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Submit Task Update Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-3xl font-semibold text-white mb-4">Submit Task Update</h3>
          <form onSubmit={handleSubmitTaskUpdate}>
            <textarea
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              rows="4"
              value={taskUpdate}
              onChange={(e) => setTaskUpdate(e.target.value)}
              placeholder="Provide updates on your task"
              required
            />
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300 mt-4"
            >
              Submit Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberTasks;
