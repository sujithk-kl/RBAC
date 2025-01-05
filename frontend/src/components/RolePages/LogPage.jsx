import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook

const LogPage = () => {
  const [managerTasks, setManagerTasks] = useState([]);
  const [teamLeaderTasks, setTeamLeaderTasks] = useState([]); // State for Team Leader tasks
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
    const storedManagerTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    const storedTeamLeaderTasks = JSON.parse(localStorage.getItem("teamLeaderTasks"));

    if (storedManagerTasks) {
      setManagerTasks(storedManagerTasks);
    }
    if (storedTeamLeaderTasks) {
      setTeamLeaderTasks(storedTeamLeaderTasks);
    }
  }, []);

  // Function to handle editing a task
  const handleEdit = (task, index, isTeamLeaderTask) => {
    setEditingTask({ index, isTeamLeaderTask });
    setUpdatedTask(task);
  };

  // Function to handle saving the edited task
  const handleSaveEdit = () => {
    if (editingTask.isTeamLeaderTask) {
      const updatedTasks = [...teamLeaderTasks];
      updatedTasks[editingTask.index] = updatedTask;

      setTeamLeaderTasks(updatedTasks);
      localStorage.setItem("teamLeaderTasks", JSON.stringify(updatedTasks));
    } else {
      const updatedTasks = [...managerTasks];
      updatedTasks[editingTask.index] = updatedTask;

      setManagerTasks(updatedTasks);
      localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    }

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
  const handleDelete = (index, isTeamLeaderTask) => {
    if (isTeamLeaderTask) {
      const updatedTasks = teamLeaderTasks.filter((_, i) => i !== index);
      setTeamLeaderTasks(updatedTasks);
      localStorage.setItem("teamLeaderTasks", JSON.stringify(updatedTasks));
    } else {
      const updatedTasks = managerTasks.filter((_, i) => i !== index);
      setManagerTasks(updatedTasks);
      localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    }
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

        {/* Display Manager Assigned Tasks */}
        <h3 className="text-xl font-semibold text-gray-700 mt-6">Tasks Assigned by Manager</h3>
        {managerTasks.length > 0 ? (
          <div className="space-y-4">
            {managerTasks.map((task, index) => (
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
                    onClick={() => handleEdit(task, index, false)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(index, false)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks assigned by manager yet.</p>
        )}

        {/* Display Team Leader Assigned Tasks */}
        <h3 className="text-xl font-semibold text-gray-700 mt-6">Tasks Assigned by Team Leader</h3>
        {teamLeaderTasks.length > 0 ? (
          <div className="space-y-4">
            {teamLeaderTasks.map((task, index) => (
              <div key={index} className="p-4 bg-green-100 text-green-800 rounded-lg shadow">
                <p>
                  <strong>Task:</strong> {task.task}
                </p>
                <p>
                  <strong>Assigned To:</strong> {task.member}
                </p>

                {/* Edit and Delete Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleEdit(task, index, true)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded"
                    onClick={() => handleDelete(index, true)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No tasks assigned by Team Leader yet.</p>
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
