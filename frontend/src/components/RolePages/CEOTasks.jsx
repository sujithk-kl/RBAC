import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CEOTasks = () => {
  const navigate = useNavigate();
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    manager: "",
    description: "",
    budget: "",
  });
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  const [showTasks, setShowTasks] = useState(false);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("assignedTasks"));
    if (storedTasks) {
      setAssignedTasks(storedTasks);
    }

    const savedProjects = JSON.parse(localStorage.getItem("assignedProjects"));
    if (savedProjects) {
      setAssignedProjects(savedProjects);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAssignProject = () => {
    if (
      !projectDetails.title ||
      !projectDetails.manager ||
      !projectDetails.description ||
      !projectDetails.budget
    ) {
      alert("Please fill in all fields before assigning the project.");
      return;
    }

    const updatedProjects = [...assignedProjects, projectDetails];
    setAssignedProjects(updatedProjects);
    localStorage.setItem("assignedProjects", JSON.stringify(updatedProjects));

    alert("Project assigned successfully!");
    setProjectDetails({ title: "", manager: "", description: "", budget: "" });
  };

  const toggleShowProjects = () => {
    setShowProjects((prevShow) => !prevShow);
  };

  const handleLogout = () => {
    alert("Logged out successfully!");
    window.location.href = "/login";
  };

  const handleOpenLogPage = () => {
    navigate("/log");
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white min-h-screen">
        <div className="p-6 text-2xl font-bold text-center">
          <span className="text-[#16a085]">CEO Dashboard</span>
        </div>
        <div className="p-6">
          <button
            onClick={toggleShowProjects}
            className="w-full py-3 bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-full hover:from-green-600 hover:to-lime-600 shadow-xl transition duration-300 mb-4"
          >
            {showProjects ? "Hide Assigned Projects" : "View Assigned Projects"}
          </button>
          <button
            onClick={handleOpenLogPage}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300 mb-4"
          >
            View Logs
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gradient-to-r from-blue-900 via-green-800 to-teal-700">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-extrabold text-white">CEO Dashboard</h2>
        </div>

        {/* Task Section */}
        {showTasks && (
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Assigned Tasks</h3>
            {assignedTasks.length === 0 ? (
              <p className="text-gray-200 text-center">No tasks assigned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#34495e] text-white rounded-xl shadow-lg hover:scale-105 duration-200"
                  >
                    <h4 className="text-xl font-bold text-[#5a67d8]">{task.task}</h4>
                    <p><strong>Team Leader:</strong> {task.teamLeader}</p>
                    <p><strong>Team Members:</strong> {task.teamMembers}</p>
                    <p><strong>Deadline:</strong> {task.deadline}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Assign New Project Form */}
        <div className="space-y-6 mb-8">
          <h3 className="text-3xl font-semibold text-white mb-4">Assign New Project</h3>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Project Title</label>
              <input
                type="text"
                name="title"
                value={projectDetails.title}
                onChange={handleChange}
                placeholder="Enter project title"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Assigned Manager</label>
              <input
                type="text"
                name="manager"
                value={projectDetails.manager}
                onChange={handleChange}
                placeholder="Enter manager's name"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Project Description</label>
              <textarea
                name="description"
                value={projectDetails.description}
                onChange={handleChange}
                placeholder="Enter project description"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8]"
                rows="4"
              ></textarea>
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300 font-medium">Project Budget</label>
              <input
                type="text"
                name="budget"
                value={projectDetails.budget}
                onChange={handleChange}
                placeholder="Enter project budget"
                className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8]"
              />
            </div>

            <button
              onClick={handleAssignProject}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300"
            >
              Assign Project
            </button>
          </form>
        </div>

        {/* Assigned Projects Section */}
        {showProjects && (
          <div className="space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Assigned Projects</h3>
            {assignedProjects.length === 0 ? (
              <p className="text-gray-200 text-center">No projects assigned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignedProjects.map((project, index) => (
                  <div
                    key={index}
                    className="p-6 bg-[#34495e] rounded-xl shadow-lg border border-gray-600 text-white"
                  >
                    <h4 className="text-xl font-bold text-[#5a67d8]">{project.title}</h4>
                    <p><strong>Manager:</strong> {project.manager}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                    <p className="text-green-400 font-bold"><strong>Budget:</strong> ${project.budget}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CEOTasks;
