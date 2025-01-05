import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TeamLeaderPage = () => {
  const [teamMember, setTeamMember] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [task, setTask] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [managerTasks, setManagerTasks] = useState([]); // Tasks from Manager
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedMembers = JSON.parse(localStorage.getItem("teamMembers"));
    const storedTasks = JSON.parse(localStorage.getItem("teamLeaderTasks"));
    const storedManagerTasks = JSON.parse(localStorage.getItem("managerAssignedTasks")); // Fetch manager's tasks

    if (storedMembers) setTeamMembers(storedMembers);
    if (storedTasks) setAssignedTasks(storedTasks);
    if (storedManagerTasks) setManagerTasks(storedManagerTasks); // Set manager's tasks
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
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Team Leader Page</h2>
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

        {/* Add Team Member */}
        <form onSubmit={handleAddMember} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Add Team Member</h3>
          <div className="flex space-x-4">
            <input
              type="text"
              value={teamMember}
              onChange={(e) => setTeamMember(e.target.value)}
              className="flex-1 p-2 border rounded"
              placeholder="Enter team member name"
            />
            <button
              type="submit"
              className="py-2 px-4 bg-blue-600 text-white rounded"
            >
              Add Member
            </button>
          </div>
        </form>

        {/* Assign Task */}
        <form onSubmit={handleAssignTask} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Assign Task</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="teamMember" className="block text-sm font-semibold">
                Select Team Member
              </label>
              <select
                id="teamMember"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
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
              <label htmlFor="task" className="block text-sm font-semibold">
                Task Description
              </label>
              <input
                id="task"
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full p-2 mt-2 border rounded"
                placeholder="Enter task description"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 mt-6 bg-blue-600 text-white rounded"
            >
              Assign Task
            </button>
          </div>
        </form>

        {/* Display Manager Assigned Tasks */}
        {managerTasks.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Tasks Assigned by Manager</h3>
            <ul className="space-y-4">
              {managerTasks.map((task, index) => (
                <li
                  key={index}
                  className="p-4 bg-yellow-100 text-yellow-800 rounded"
                >
                  <p>
                    <strong>Task:</strong> {task.task}
                  </p>
                  <p>
                    <strong>Deadline:</strong> {task.deadline}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Display Assigned Tasks */}
        {assignedTasks.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Assigned Tasks</h3>
            <ul className="space-y-4">
              {assignedTasks.map((assignedTask, index) => (
                <li key={index} className="p-4 bg-blue-100 text-blue-800 rounded">
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
