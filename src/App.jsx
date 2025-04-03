import React, { useState } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import AppRoutes from "./utils/routes/AppRoutes";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import { CssBaseline, Box } from "@mui/material";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const isLogin = location.pathname === "/"; // Ocultar layout si es login

  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      {!isLogin && <Topbar />}
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        {!isLogin && (
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
            marginTop: isLogin ? 0 : "70px", // espacio para el Topbar
            marginLeft: isLogin ? 0 : isSidebarOpen ? "220px" : "80px",
            padding: isLogin ? 0 : "20px",
            backgroundColor: "#D9D7CC",
            height: "100%",
            overflowY: "auto",
          }}
        >
          <AppRoutes />
        </Box>
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
