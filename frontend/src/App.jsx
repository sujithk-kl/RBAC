import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Common Routes */}
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />

        {/* General Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Role-Based Dashboards */}
        <Route
          path="/dashboard-ceo"
          element={
            <ProtectedRoute role="CEO">
              <Dashboard role="CEO" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-manager"
          element={
            <ProtectedRoute role="Manager">
              <Dashboard role="Manager" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-leader"
          element={
            <ProtectedRoute role="Team Leader">
              <Dashboard role="Team Leader" />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard-member"
          element={
            <ProtectedRoute role="Team Member">
              <Dashboard role="Team Member" />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
