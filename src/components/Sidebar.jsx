import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Box, Backdrop } from "@mui/material";
import { Menu as MenuIcon, People as PeopleIcon, Apartment as ApartmentIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar({ isOpen, toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar el sidebar en la página de Login
  if (location.pathname === "/") return null;

  return (
    <>
      {/* Fondo oscuro cuando el menú está abierto */}
      <Backdrop
        open={isOpen}
        onClick={toggleSidebar}
        sx={{ zIndex: 1000, backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      />

      {/* Columna visible cuando el menú está cerrado */}
      <Box
        sx={{
          width: isOpen ? 0 : 80,
          height: "100vh",
          backgroundColor: "#7a4d2b",
          transition: "width 0.3s ease-in-out",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          position: "fixed",
          paddingTop: "10px",
          zIndex: 1201,
        }}
      >
        {/* Botón de menú hamburguesa */}
        <IconButton onClick={toggleSidebar} sx={{ color: "white" }}>
          <MenuIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Box>

      {/* Sidebar expansible */}
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          "& .MuiDrawer-paper": {
            width: 220,
            backgroundColor: "#7a4d2b",
            color: "white",
            transition: "width 0.3s ease-in-out",
            zIndex: 1202,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", justifyContent: "center" }}>
        <List>
  {/* Redirigir correctamente a Home */}
  <ListItem button onClick={() => { navigate("/home"); toggleSidebar(); }}>
    <ListItemIcon><PeopleIcon sx={{ color: "white" }} /></ListItemIcon>
    <ListItemText primary="Usuarios" />
  </ListItem>

  {/* Redirigir correctamente a Residencias */}
  <ListItem button onClick={() => { navigate("/residencias"); toggleSidebar(); }}>
    <ListItemIcon><ApartmentIcon sx={{ color: "white" }} /></ListItemIcon>
    <ListItemText primary="Residencias" />
  </ListItem>
</List>

        </Box>
      </Drawer>
    </>
  );
}

export default Sidebar;
