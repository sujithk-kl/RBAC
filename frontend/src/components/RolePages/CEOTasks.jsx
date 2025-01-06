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
    <div
      className="flex flex-col items-center min-h-screen px-6 py-8 sm:px-10 lg:px-12 bg-gradient-to-r from-blue-900 via-green-800 to-teal-700"
    >
      <div className="w-full max-w-4xl p-8 bg-gradient-to-br from-[#2c3e50] via-[#34495e] to-[#16a085] rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          CEO Dashboard 
        </h2>

        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={handleOpenLogPage}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            View Logs
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-full shadow-lg hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
        </div>

        {showTasks && (
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
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <form className="space-y-6 mb-8">
          <h3 className="text-3xl font-semibold text-white mb-4">Assign New Project</h3>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={projectDetails.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Assigned Manager</label>
            <input
              type="text"
              name="manager"
              value={projectDetails.manager}
              onChange={handleChange}
              placeholder="Enter manager's name"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Project Description</label>
            <textarea
              name="description"
              value={projectDetails.description}
              onChange={handleChange}
              placeholder="Enter project description"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">Project Budget</label>
            <input
              type="text"
              name="budget"
              value={projectDetails.budget}
              onChange={handleChange}
              placeholder="Enter project budget"
              className="w-full p-4 border-2 border-gray-600 rounded-xl bg-[#1c2833] text-white focus:ring-2 focus:ring-[#5a67d8] focus:outline-none"
            />
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          <button
            onClick={handleAssignProject}
            className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-full hover:from-blue-600 hover:to-teal-600 shadow-xl transition duration-300"
          >
            Assign Project
          </button>
          <button
            onClick={toggleShowProjects}
            className="px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-full hover:from-green-600 hover:to-lime-600 shadow-xl transition duration-300"
          >
            {showProjects ? "Hide Assigned Projects" : "View Assigned Projects"}
          </button>
        </div>

        {showProjects && (
          <div className="mt-8 space-y-6">
            <h3 className="text-3xl font-semibold text-white mb-4">Assigned Projects</h3>
            {assignedProjects.length === 0 ? (
              <p className="text-gray-200 text-center">No projects assigned yet.</p>
            ) : (
              <ul className="space-y-6">
                {assignedProjects.map((project, index) => (
                  <li
                    key={index}
                    className="p-6 bg-[#34495e] rounded-xl shadow-lg border border-gray-600 text-white transition-all hover:scale-105 duration-200"
                  >
                    <h4 className="text-xl font-bold text-[#5a67d8]">{project.title}</h4>
                    <p><strong>Manager:</strong> {project.manager}</p>
                    <p><strong>Description:</strong> {project.description}</p>
                    <p className="text-green-400 font-bold"><strong>Budget:</strong> ${project.budget}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CEOTasks;
