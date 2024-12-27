import React, { useState, useEffect } from "react";

const CEOTasks = () => {
  // State for assigned tasks
  const [assignedTasks, setAssignedTasks] = useState([]);
  
  // State for project details
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    manager: "",
    description: "",
    budget: "",
  });

  // State for assigned projects
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [showProjects, setShowProjects] = useState(false);
  
  // State for showing assigned tasks
  const [showTasks, setShowTasks] = useState(false); // For toggling tasks display

  // Load assigned tasks and projects from local storage when the component mounts
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

  // Handle form input changes for project details
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle Assign Project Button Click
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

    // Add the new project to the assigned projects list
    const updatedProjects = [...assignedProjects, projectDetails];
    setAssignedProjects(updatedProjects);

    // Save the updated project list to local storage
    localStorage.setItem("assignedProjects", JSON.stringify(updatedProjects));

    alert("Project assigned successfully!");
    setProjectDetails({ title: "", manager: "", description: "", budget: "" }); // Clear form
  };

  // Toggle View Assigned Projects
  const toggleShowProjects = () => {
    setShowProjects((prevShow) => !prevShow);
  };

  // Toggle visibility of tasks
  const handleShowTasks = () => {
    setShowTasks((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-lg">
        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          CEO View Assigned Tasks & Projects
        </h2>

        {/* Button to show/hide tasks */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleShowTasks}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            LOG
          </button>
        </div>

        {/* Section for Assigned Tasks */}
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

        {/* Section for Project Assignment */}
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

        {/* Assign Project Button */}
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

        {/* Assigned Projects List */}
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
