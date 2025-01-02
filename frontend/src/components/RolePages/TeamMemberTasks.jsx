import React, { useState } from "react";

const TeamMemberTasks = () => {
  const [taskUpdate, setTaskUpdate] = useState("");
  const [feedback, setFeedback] = useState("");

  // Submit Task Updates
  const handleSubmitTaskUpdate = (e) => {
    e.preventDefault();
    alert(`Task update submitted: ${taskUpdate}`);
    setTaskUpdate("");
  };

  // Request Feedback
  const handleRequestFeedback = () => {
    alert("Feedback request submitted!");
    setFeedback("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center mb-6">Team Member Task Page</h2>

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

        {/* Request Feedback Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Request Feedback</h3>
          <button
            onClick={handleRequestFeedback}
            className="w-full py-2 mt-4 bg-green-600 text-white rounded"
          >
            Request Feedback from Manager
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberTasks;
