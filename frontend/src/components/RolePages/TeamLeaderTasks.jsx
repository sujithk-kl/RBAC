import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerTasks = () => {
  const [teamLeader, setTeamLeader] = useState("");
  const [task, setTask] = useState("");
  const [report, setReport] = useState("");
  const [message, setMessage] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Index for editing task
  const [editTaskDetails, setEditTaskDetails] = useState({
    task: "",
    report: "",
  });

  const navigate = useNavigate();

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    if (storedTasks) {
      setAssignedTasks(storedTasks);
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!teamLeader || !task || !report) {
      setMessage("Please fill in all fields");
      return;
    }

    const newTask = { task, teamLeader, report };
    const updatedTasks = [...assignedTasks, newTask];
    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    setMessage("Task successfully assigned!");
    setTeamLeader("");
    setTask("");
    setReport("");
  };

  const handleEditTask = (index) => {
    const taskToEdit = assignedTasks[index];
    setEditIndex(index);
    setEditTaskDetails({
      task: taskToEdit.task,
      report: taskToEdit.report,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (!editTaskDetails.task || !editTaskDetails.report) {
      setMessage("Please fill in all fields");
      return;
    }

    const updatedTasks = [...assignedTasks];
    updatedTasks[editIndex] = editTaskDetails;
    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    setMessage("Task updated successfully!");
    setEditIndex(null);
    setEditTaskDetails({
      task: "",
      report: "",
    });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = assignedTasks.filter((_, i) => i !== index);
    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    setMessage("Task deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken"); // Example: Clearing a token
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Team Leader Task Page</h2>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-500 text-white rounded"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            {message}
          </div>
        )}

        <form onSubmit={editIndex !== null ? handleSaveEdit : handleAddTask}>
          <div className="space-y-4">
            <div>
              <label htmlFor="teamLeader" className="block text-sm font-semibold">
                Team Leader
              </label>
              <input
                id="teamLeader"
                type="text"
                value={editIndex !== null ? editTaskDetails.teamLeader : teamLeader}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, teamLeader: e.target.value })
                    : setTeamLeader(e.target.value)
                }
                className="w-full p-2 mt-2 border rounded"
                placeholder="Enter team leader name"
                required
              />
            </div>
            <div>
              <label htmlFor="task" className="block text-sm font-semibold">
                Task
              </label>
              <input
                id="task"
                type="text"
                value={editIndex !== null ? editTaskDetails.task : task}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, task: e.target.value })
                    : setTask(e.target.value)
                }
                className="w-full p-2 mt-2 border rounded"
                placeholder="Enter task description"
                required
              />
            </div>
            <div>
              <label htmlFor="report" className="block text-sm font-semibold">
                Report
              </label>
              <textarea
                id="report"
                value={editIndex !== null ? editTaskDetails.report : report}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, report: e.target.value })
                    : setReport(e.target.value)
                }
                className="w-full p-2 mt-2 border rounded"
                placeholder="Enter task report"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-6 bg-blue-600 text-white rounded"
            >
              {editIndex !== null ? "Save Changes" : "Assign Task"}
            </button>
          </div>
        </form>

        {assignedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
            <ul className="space-y-4">
              {assignedTasks.map((assignedTask, index) => (
                <li key={index} className="p-4 bg-blue-100 text-blue-800 rounded">
                  <p><strong>Task:</strong> {assignedTask.task}</p>
                  <p><strong>Team Leader:</strong> {assignedTask.teamLeader}</p>
                  <p><strong>Report:</strong> {assignedTask.report}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEditTask(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerTasks;
