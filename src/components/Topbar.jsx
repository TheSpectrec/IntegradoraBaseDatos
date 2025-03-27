import React from "react"; 
import { Box, Button, Typography } from "@mui/material";
import { Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar el encabezado en la página de Login
  if (location.pathname === "/") return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "70px", // Ajusta la altura del Topbar
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#DFDFDF",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "0 20px",
        zIndex: 1100, // Asegura que el Topbar esté sobre el contenido
      }}
    >
     {/* Logo y título */}
<Box sx={{ display: "flex", alignItems: "center", marginLeft: "75px" }}>
  <img 
    src="../src/assets/img/LOGOTIPO.png" 
    alt="Logo" 
    style={{ height: "50px", marginRight: "10px" }} 
  />
  <Typography variant="h6" sx={{ fontWeight: "bold" }}>CVF</Typography>
</Box>

      {/* Botón de Cerrar Sesión */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#80876d",
          color: "white",
          "&:hover": { backgroundColor: "#6c7750" },
          fontWeight: "bold",
          textTransform: "none",
          borderRadius: "8px",
        }}
        endIcon={<LogoutIcon />}
        onClick={() => navigate("/")}
      >
        Cerrar Sesión
      </Button>
    </Box>
  );
};

export default Topbar;
