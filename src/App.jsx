import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./utils/routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import { CssBaseline, Box } from "@mui/material";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Ocultar el Sidebar en Login
  const hideSidebar = location.pathname === "/";

  return (
    <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
      {!hideSidebar && (
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: "margin-left 0.3s ease-in-out",
          marginLeft: hideSidebar ? "0px" : isSidebarOpen ? "220px" : "80px",
          padding: hideSidebar ? "0px" : "20px",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <AppRoutes />
      </Box>
    </Box>
  );
}

function App() {
  return (
    <Router>
      <CssBaseline />
      <Layout />
    </Router>
  );
}

export default App;
