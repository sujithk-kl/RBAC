import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

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

    // Navigate to the login or home page
    navigate("/login"); // Assuming "/login" is the route for the login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Team Member Task Page</h2>

        {/* Logout Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>

        {/* Submit Task Update Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Submit Task Update</h3>
          <form onSubmit={handleSubmitTaskUpdate}>
            <textarea
              className="w-full p-2 mt-2 border rounded"
              rows="4"
              value={taskUpdate}
              onChange={(e) => setTaskUpdate(e.target.value)}
              placeholder="Provide updates on your task"
              required
            />
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-blue-600 text-white rounded"
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
