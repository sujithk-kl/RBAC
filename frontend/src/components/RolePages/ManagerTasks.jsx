import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerTasks = () => {
  const [teamLeader, setTeamLeader] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskDetails, setEditTaskDetails] = useState({
    task: "",
    teamLeader: "",
    teamMembers: "",
    deadline: "",
  });

  const [assignedProjects, setAssignedProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    if (storedTasks) {
      setAssignedTasks(storedTasks);
    }

    const storedProjects = JSON.parse(localStorage.getItem("assignedProjects"));
    if (storedProjects) {
      setAssignedProjects(storedProjects);
    }
  }, []);

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!teamLeader || !teamMembers || !task || !deadline) {
      setMessage("Please fill in all fields");
      return;
    }

    const newTask = { task, teamLeader, teamMembers, deadline };
    const updatedTasks = [...assignedTasks, newTask];
    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    setMessage("Task successfully assigned!");
    setTeamLeader("");
    setTeamMembers("");
    setTask("");
    setDeadline("");
  };

  const handleEditTask = (index) => {
    const taskToEdit = assignedTasks[index];
    setEditIndex(index);
    setEditTaskDetails({
      task: taskToEdit.task,
      teamLeader: taskToEdit.teamLeader,
      teamMembers: taskToEdit.teamMembers,
      deadline: taskToEdit.deadline,
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();

    if (
      !editTaskDetails.teamLeader ||
      !editTaskDetails.teamMembers ||
      !editTaskDetails.task ||
      !editTaskDetails.deadline
    ) {
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
      teamLeader: "",
      teamMembers: "",
      deadline: "",
    });
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = assignedTasks.filter((_, i) => i !== index);
    setAssignedTasks(updatedTasks);
    localStorage.setItem("assignedTasks", JSON.stringify(updatedTasks));
    setMessage("Task deleted successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-8">
      <div className="w-full max-w-4xl p-6 sm:p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manager Task Page</h2>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}

        {/* Form to Add/Edit Task */}
        <form
          onSubmit={editIndex !== null ? handleSaveEdit : handleAddTask}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="teamLeader"
                className="block text-sm font-medium text-gray-700"
              >
                Team Leader
              </label>
              <input
                id="teamLeader"
                type="text"
                value={
                  editIndex !== null ? editTaskDetails.teamLeader : teamLeader
                }
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({
                        ...editTaskDetails,
                        teamLeader: e.target.value,
                      })
                    : setTeamLeader(e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter team leader name"
                required
              />
            </div>
            <div>
              <label
                htmlFor="teamMembers"
                className="block text-sm font-medium text-gray-700"
              >
                Team Members
              </label>
              <input
                id="teamMembers"
                type="text"
                value={
                  editIndex !== null ? editTaskDetails.teamMembers : teamMembers
                }
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({
                        ...editTaskDetails,
                        teamMembers: e.target.value,
                      })
                    : setTeamMembers(e.target.value)
                }
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter team members (comma separated)"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="task"
              className="block text-sm font-medium text-gray-700"
            >
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
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter task description"
              required
            />
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Deadline
            </label>
            <input
              id="deadline"
              type="datetime-local"
              value={
                editIndex !== null ? editTaskDetails.deadline : deadline
              }
              onChange={(e) =>
                editIndex !== null
                  ? setEditTaskDetails({
                      ...editTaskDetails,
                      deadline: e.target.value,
                    })
                  : setDeadline(e.target.value)
              }
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editIndex !== null ? "Save Changes" : "Assign Task"}
          </button>
        </form>

        {/* Display Assigned Tasks */}
        {assignedTasks.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Assigned Tasks
            </h3>
            <ul className="space-y-4">
              {assignedTasks.map((assignedTask, index) => (
                <li
                  key={index}
                  className="p-4 bg-blue-100 text-blue-800 rounded-lg shadow"
                >
                  <p>
                    <strong>Task:</strong> {assignedTask.task}
                  </p>
                  <p>
                    <strong>Team Leader:</strong> {assignedTask.teamLeader}
                  </p>
                  <p>
                    <strong>Team Members:</strong> {assignedTask.teamMembers}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {assignedTask.deadline}
                  </p>
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleEditTask(index)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(index)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Projects Assigned by CEO */}
        {assignedProjects.length > 0 && (
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Projects Assigned by CEO
            </h3>
            <ul className="space-y-4">
              {assignedProjects.map((project, index) => (
                <li
                  key={index}
                  className="p-4 bg-gray-100 text-gray-800 rounded-lg shadow"
                >
                  <h4 className="text-lg font-bold">{project.title}</h4>
                  <p>
                    <strong>Manager:</strong> {project.manager}
                  </p>
                  <p>
                    <strong>Description:</strong> {project.description}
                  </p>
                  <p>
                    <strong>Budget:</strong> ${project.budget}
                  </p>
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