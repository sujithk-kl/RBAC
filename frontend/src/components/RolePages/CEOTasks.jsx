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
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <div className="relative w-full max-w-4xl p-8 bg-white rounded shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          CEO Tasks & Projects
        </h2>

        <div className="absolute top-4 right-4 flex gap-4">
          <button
            onClick={handleOpenLogPage}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Log
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            Logout
          </button>
        </div>

        {showTasks && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assigned Tasks by Manager</h3>
            {assignedTasks.length === 0 ? (
              <p className="text-gray-600">No tasks assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {assignedTasks.map((task, index) => (
                  <li key={index} className="p-4 bg-blue-100 text-blue-800 rounded shadow border">
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
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assign Project</h3>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Title</label>
            <input
              type="text"
              name="title"
              value={projectDetails.title}
              onChange={handleChange}
              placeholder="Enter project title"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Assigned Manager</label>
            <input
              type="text"
              name="manager"
              value={projectDetails.manager}
              onChange={handleChange}
              placeholder="Enter manager's name"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Description</label>
            <textarea
              name="description"
              value={projectDetails.description}
              onChange={handleChange}
              placeholder="Enter project description"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
              rows="4"
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Project Budget</label>
            <input
              type="text"
              name="budget"
              value={projectDetails.budget}
              onChange={handleChange}
              placeholder="Enter project budget"
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={handleAssignProject}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            Assign Project
          </button>
          <button
            onClick={toggleShowProjects}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            {showProjects ? "Hide Assigned Projects" : "View Assigned Projects"}
          </button>
        </div>

        {showProjects && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Assigned Projects</h3>
            {assignedProjects.length === 0 ? (
              <p className="text-gray-600">No projects assigned yet.</p>
            ) : (
              <ul className="space-y-4">
                {assignedProjects.map((project, index) => (
                  <li key={index} className="p-4 bg-gray-100 rounded shadow border">
                    <h4 className="text-xl font-bold text-gray-700">{project.title}</h4>
                    <p className="text-gray-700"><strong>Manager:</strong> {project.manager}</p>
                    <p className="text-gray-700"><strong>Description:</strong> {project.description}</p>
                    <p className="text-green-700 font-bold"><strong>Budget:</strong> ${project.budget}</p>
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
