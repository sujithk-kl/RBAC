import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import HomePage from "./components/HomePage";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import CEOTasks from "./components/RolePages/CEOTasks";
import ManagerTasks from "./components/RolePages/ManagerTasks";
import TeamLeaderTasks from "./components/RolePages/TeamLeaderTasks";
import TeamMemberTasks from "./components/RolePages/TeamMemberTasks";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const currentUserRole = localStorage.getItem("role"); // Get logged-in user's role from localStorage

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />

        {/* General Dashboard (accessible by all roles) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["CEO", "Manager", "Team Leader", "Team Member"]}>
              <Dashboard role={currentUserRole} />
            </ProtectedRoute>
          }
        />

        {/* Role-Based Task Pages */}
        <Route path="/ceo-tasks" element={<CEOTasks />} />
        <Route path="/manager-tasks" element={<ManagerTasks />} />
        <Route path="/team-leader-tasks" element={<TeamLeaderTasks />} />
        <Route path="/team-member-tasks" element={<TeamMemberTasks />} />

        {/* Role-Based Dashboards */}
        <Route
          path="/dashboard-ceo"
          element={
            <ProtectedRoute allowedRoles={["CEO"]}>
              <Dashboard role="CEO" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-manager"
          element={
            <ProtectedRoute allowedRoles={["Manager"]}>
              <Dashboard role="Manager" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-leader"
          element={
            <ProtectedRoute allowedRoles={["Team Leader"]}>
              <Dashboard role="Team Leader" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-member"
          element={
            <ProtectedRoute allowedRoles={["Team Member"]}>
              <Dashboard role="Team Member" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
