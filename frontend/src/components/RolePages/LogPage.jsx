import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const LogPage = () => {
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    task: "",
    teamLeader: "",
    teamMembers: "",
    deadline: "",
  });

  const navigate = useNavigate(); // Create navigate function

  // Fetch tasks from localStorage on page load
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    if (storedTasks) {
      setAssignedTasks(storedTasks);
    }
  }, []);

  // Function to handle editing a task
  const handleEdit = (task, index) => {
    setEditingTask(index);
    setUpdatedTask(task);
  };

  // Function to handle saving the edited task
  const handleSaveEdit = () => {
    const updatedTasks = [...assignedTasks];
    updatedTasks[editingTask] = updatedTask;

    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));

    // Reset editing state
    setEditingTask(null);
    setUpdatedTask({
      task: "",
      teamLeader: "",
      teamMembers: "",
      deadline: "",
    });
  };

  // Function to handle deleting a task
  const handleDelete = (index) => {
    const updatedTasks = assignedTasks.filter((_, i) => i !== index);

    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded shadow-lg">
        
        {/* Back Button with Icon */}
        <button
          onClick={() => navigate(-1)} // Navigate to the previous page
          className="absolute top-4 left-4 text-2xl text-gray-600 p-2 rounded-full hover:bg-gray-200"
        >
          &#8592; {/* Left arrow icon */}
        </button>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Log Page</h2>

        {/* Display Assigned Tasks */}
        {assignedTasks.length > 0 ? (
          <div className="space-y-4">
            {assignedTasks.map((task, index) => (
              <div key={index} className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow">
                <p>
                  <strong>Task:</strong> {task.task}
                </p>
                <p>
                  <strong>Team Leader:</strong> {task.teamLeader}
                </p>
                <p>
                  <strong>Team Members:</strong> {task.teamMembers}
                </p>
                <p>
                  <strong>Deadline:</strong> {task.deadline}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(task, index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks assigned yet.</p>
        )}

        {/* Edit Form (Appears when editing a task) */}
        {editingTask !== null && (
          <div className="mt-8 p-6 bg-white rounded shadow">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Task:</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={updatedTask.task}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, task: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Team Leader:</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={updatedTask.teamLeader}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, teamLeader: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Team Members:</label>
                <input
                  type="text"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={updatedTask.teamMembers}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, teamMembers: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700">Deadline:</label>
                <input
                  type="datetime-local"
                  className="w-full p-2 mt-1 border border-gray-300 rounded"
                  value={updatedTask.deadline}
                  onChange={(e) => setUpdatedTask({ ...updatedTask, deadline: e.target.value })}
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Save Changes
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogPage;
