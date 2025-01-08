import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerTasks = () => {
  const [teamLeader, setTeamLeader] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editTaskDetails, setEditTaskDetails] = useState({
    task: "",
    teamLeader: "",
    teamMembers: "",
    deadline: "",
  });
  const [showProjects, setShowProjects] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const toggleShowProjects = () => {
    setShowProjects((prevShow) => !prevShow);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "block" : "hidden"
        } w-64 bg-black p-9 text-white fixed inset-0 z-50 md:block`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 md:hidden px-4 py-2 bg-red-600 text-white rounded-full"
        >
          Close
        </button>
        <h2 className="text-3xl font-bold mb-20">Manager Dashboard</h2>
        <ul className="space-y-9">
          <li>
            <button
              onClick={() => navigate("/log")}
              className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full hover:from-green-600 hover:to-teal-600 transition duration-300"
            >
              View Logs
            </button>
          </li>
          <li>
            <button
              onClick={toggleShowProjects}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 transition duration-300"
            >
              {showProjects ? "Hide Assigned Projects" : "View Assigned Projects"}
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full hover:from-red-600 hover:to-pink-600 transition duration-300"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 ml-64 p-8 bg-gradient-to-r from-blue-900 via-green-800 to-teal-700">
        <button
          onClick={toggleSidebar}
          className="md:hidden absolute top-4 left-4 px-4 py-2 bg-blue-600 text-white rounded-full"
        >
          Open Sidebar
        </button>

        <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#16a085] rounded-3xl shadow-2xl">
          <h2 className="text-4xl font-extrabold text-center text-white mb-8">
            Manager Dashboard
          </h2>

          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
              {message}
            </div>
          )}

          {/* Form to Add/Edit Task */}
          <form
            onSubmit={editIndex !== null ? handleSaveEdit : handleAddTask}
            className="space-y-6 mb-8"
          >
            {/* Input Fields for Task */}
            <div>
              <label className="block text-gray-300 font-medium mb-2">Team Leader</label>
              <input
                type="text"
                value={editIndex !== null ? editTaskDetails.teamLeader : teamLeader}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, teamLeader: e.target.value })
                    : setTeamLeader(e.target.value)
                }
                placeholder="Enter team leader name"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Team Members</label>
              <input
                type="text"
                value={editIndex !== null ? editTaskDetails.teamMembers : teamMembers}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, teamMembers: e.target.value })
                    : setTeamMembers(e.target.value)
                }
                placeholder="Enter team members (comma separated)"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Task</label>
              <input
                type="text"
                value={editIndex !== null ? editTaskDetails.task : task}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, task: e.target.value })
                    : setTask(e.target.value)
                }
                placeholder="Enter task description"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-2">Deadline</label>
              <input
                type="date"
                value={editIndex !== null ? editTaskDetails.deadline : deadline}
                onChange={(e) =>
                  editIndex !== null
                    ? setEditTaskDetails({ ...editTaskDetails, deadline: e.target.value })
                    : setDeadline(e.target.value)
                }
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300"
            >
              {editIndex !== null ? "Save Task" : "Assign Task"}
            </button>
          </form>

          {/* Display Assigned Tasks */}
          <div className="mt-8 space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Assigned Tasks</h3>
            {assignedTasks.length === 0 ? (
              <p className="text-gray-200 text-center">No tasks assigned yet.</p>
            ) : (
              <ul className="space-y-6">
                {assignedTasks.map((task, index) => (
                  <li
                    key={index}
                    className="p-5 bg-[#34495e] text-white rounded-lg shadow-md transition-all hover:scale-105 duration-200"
                  >
                    <p><strong>Task:</strong> {task.task}</p>
                    <p><strong>Team Leader:</strong> {task.teamLeader}</p>
                    <p><strong>Team Members:</strong> {task.teamMembers}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleEditTask(index)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteTask(index)}
                        className="px-4 py-2 bg-red-500 text-white rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Display Assigned Projects */}
          {showProjects && (
            <div className="mt-8 space-y-6">
              <h3 className="text-3xl font-semibold text-white mb-4">Assigned Projects</h3>
              <ul className="space-y-6">
                {assignedProjects.length === 0 ? (
                  <p className="text-gray-200 text-center">No projects assigned yet.</p>
                ) : (
                  assignedProjects.map((project, index) => (
                    <li
                      key={index}
                      className="p-6 bg-[#34495e] rounded-xl shadow-lg border border-gray-600 text-white transition-all hover:scale-105 duration-200"
                    >
                      <h4 className="text-xl font-bold text-[#5a67d8]">{project.title}</h4>
                      <p><strong>Manager:</strong> {project.manager}</p>
                      <p><strong>Description:</strong> {project.description}</p>
                      <p className="text-green-400 font-bold"><strong>Budget:</strong> ${project.budget}</p>
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerTasks;
