import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamMemberTasks = () => {
  const [taskUpdate, setTaskUpdate] = useState("");
  const [submittedUpdates, setSubmittedUpdates] = useState([]);
  const [editingUpdate, setEditingUpdate] = useState(null); // To track which update is being edited
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch stored task updates from localStorage when the component mounts
  useEffect(() => {
    const storedUpdates = JSON.parse(localStorage.getItem("taskUpdates")) || [];
    setSubmittedUpdates(storedUpdates);
  }, []);

  // Submit Task Updates
  const handleSubmitTaskUpdate = (e) => {
    e.preventDefault();

    const newUpdate = {
      id: Date.now(), // Unique identifier
      content: taskUpdate,
      submittedAt: new Date().toLocaleString(), // Timestamp of submission
    };

    // If editing an update, replace it with the new content
    if (editingUpdate) {
      const updatedTaskUpdates = submittedUpdates.map((update) =>
        update.id === editingUpdate.id ? { ...update, content: taskUpdate } : update
      );
      localStorage.setItem("taskUpdates", JSON.stringify(updatedTaskUpdates));
      setSubmittedUpdates(updatedTaskUpdates);
      setEditingUpdate(null); // Reset editing mode
    } else {
      // Save the new update to localStorage
      const updatedTaskUpdates = [...submittedUpdates, newUpdate];
      localStorage.setItem("taskUpdates", JSON.stringify(updatedTaskUpdates));
      setSubmittedUpdates(updatedTaskUpdates);
    }

    alert(`Task update submitted: ${taskUpdate}`);
    setTaskUpdate(""); // Clear input field
  };

  // Edit Task Update
  const handleEditUpdate = (update) => {
    setEditingUpdate(update);
    setTaskUpdate(update.content); // Set the content to be edited
  };

  // Delete Task Update
  const handleDeleteUpdate = (id) => {
    const updatedTaskUpdates = submittedUpdates.filter((update) => update.id !== id);
    localStorage.setItem("taskUpdates", JSON.stringify(updatedTaskUpdates));
    setSubmittedUpdates(updatedTaskUpdates);
    alert("Task update deleted.");
  };

  // Logout function (modified to not clear task updates from localStorage)
  const handleLogout = () => {
    // We do not clear task updates anymore to preserve them even after logout
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
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {/* Submit Task Update Section */}
        <div className="space-y-6 mb-8">
          <h3 className="text-3xl font-semibold text-white mb-4">
            {editingUpdate ? "Edit Task Update" : "Submit Task Update"}
          </h3>
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
              {editingUpdate ? "Update" : "Submit"} 
            </button>
          </form>
        </div>

        {/* Display Submitted Task Updates */}
        <div className="space-y-6 mt-8">
          <h3 className="text-3xl font-semibold text-white mb-4">Task Updates</h3>
          {submittedUpdates.length > 0 ? (
            <div className="space-y-4">
              {submittedUpdates.map((update) => (
                <div
                  key={update.id}
                  className="p-4 bg-[#34495e] text-white rounded-xl shadow-lg"
                >
                  <p>
                    <strong>Update:</strong> {update.content}
                  </p>
                  <p>
                    <strong>Submitted At:</strong> {update.submittedAt}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <button
                      onClick={() => handleEditUpdate(update)}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteUpdate(update.id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No task updates submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMemberTasks;
