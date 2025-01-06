import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamLeaderPage = () => {
  const [teamMember, setTeamMember] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [task, setTask] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [managerTasks, setManagerTasks] = useState([]); // Tasks assigned by Manager
  const [taskUpdates, setTaskUpdates] = useState([]); // Task updates from team members
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers"));
    const storedTasks = JSON.parse(localStorage.getItem("teamLeaderTasks"));
    const storedManagerTasks = JSON.parse(localStorage.getItem("assignedTasks")); // Manager's tasks
    const storedUpdates = JSON.parse(localStorage.getItem("taskUpdates")); // Task updates

    if (storedMembers) setTeamMembers(storedMembers);
    if (storedTasks) setAssignedTasks(storedTasks);
    if (storedManagerTasks) setManagerTasks(storedManagerTasks);
    if (storedUpdates) setTaskUpdates(storedUpdates);
  }, []);

  // Add a team member
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!teamMember) {
      setMessage("Please enter a team member name.");
      return;
    }

    const updatedMembers = [...teamMembers, teamMember];
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
    setTeamMember("");
    setMessage("Team member added successfully!");
  };

  // Assign a task to a team member
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!task || !selectedMember) {
      setMessage("Please select a team member and enter a task.");
      return;
    }

    const newTask = { task, member: selectedMember };
    const updatedTasks = [...assignedTasks, newTask];
    setAssignedTasks(updatedTasks);
    localStorage.setItem("teamLeaderTasks", JSON.stringify(updatedTasks));
    setTask("");
    setSelectedMember("");
    setMessage("Task assigned successfully!");
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-8 sm:px-10 lg:px-12 bg-gradient-to-r from-blue-900 via-green-800 to-teal-700">
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#16a085] rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Team Leader Dashboard
        </h2>

        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={() => navigate("/log")}
          >
           
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
            {message}
          </div>
        )}

        {/* Add Team Member */}
        <form onSubmit={handleAddMember} className="space-y-6 mb-8">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Team Member</label>
            <input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              placeholder="Enter team member name"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300"
          >
            Add Team Member
          </button>
        </form>

        {/* Assign Task */}
        <form onSubmit={handleAssignTask} className="space-y-6 mb-8">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Select Team Member</label>
            <select
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            >
              <option value="">-- Select a team member --</option>
              {teamMembers.map((member, index) => (
                <option key={index} value={member}>
                  {member}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Task Description</label>
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Enter task description"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300"
          >
            Assign Task
          </button>
        </form>

        {/* Display Manager's Tasks */}
        {managerTasks.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Tasks Assigned by Manager</h3>
            <ul className="space-y-6">
              {managerTasks.map((task, index) => (
                <li
                  key={index}
                  className="p-5 bg-[#34495e] text-white rounded-lg shadow-md transition-all hover:scale-105 duration-200"
                >
                  <p><strong>Task:</strong> {task.task}</p>
                  <p><strong>Deadline:</strong> {task.deadline || "N/A"}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Assigned Tasks */}
        {assignedTasks.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Assigned Tasks</h3>
            <ul className="space-y-6">
              {assignedTasks.map((assignedTask, index) => (
                <li
                  key={index}
                  className="p-5 bg-[#34495e] text-white rounded-lg shadow-md transition-all hover:scale-105 duration-200"
                >
                  <p>
                    <strong>Task:</strong> {assignedTask.task}
                  </p>
                  <p>
                    <strong>Assigned To:</strong> {assignedTask.member}
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

export default TeamLeaderPage;
