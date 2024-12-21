import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./utils/auth";

import CEOPage from "./pages/CEOPage";
import ManagerPage from "./pages/ManagerPage";
import TeamLeaderPage from "./pages/TeamLeaderPage";
import TeamMemberPage from "./pages/TeamMemberPage";

function App() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setRole(getUserRole());
    }
  }, []);

  return (
    <Router>
      <Routes>
        {role === "CEO" && <Route path="/ceo" element={<CEOPage />} />}
        {role === "Manager" && <Route path="/manager" element={<ManagerPage />} />}
        {role === "Team Leader" && <Route path="/team-leader" element={<TeamLeaderPage />} />}
        {role === "Team Member" && <Route path="/team-member" element={<TeamMemberPage />} />}
        {/* You can add a route for the login page here */}
      </Routes>
    </Router>
  );
}

export default App;
