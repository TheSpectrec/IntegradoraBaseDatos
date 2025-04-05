import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

const VisualizarUsuarioModal = ({ open, onClose, usuario }) => {
  if (!usuario) return null;

  const estado = usuario.enabled ? "Activo" : "Inactivo";
  const colorEstado = usuario.enabled ? "green" : "red";

  const tipoUsuarioRaw = usuario.tipoUsuario || "";
  const tipoUsuario = tipoUsuarioRaw.toLowerCase();
  const tipoCapitalizado = tipoUsuarioRaw.charAt(0).toUpperCase() + tipoUsuarioRaw.slice(1).toLowerCase();

  const house = usuario.house || usuario.house_id;
  const isResidente = tipoUsuario === "residente";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      {/* Encabezado visual igual al de Editar Usuario */}
      <DialogTitle
  sx={{
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#f1f1f1",
    borderBottom: "1px solid #ccc",
    py: 2
  }}
>
  Detalles del Usuario
</DialogTitle>

<DialogContent>
  <Box sx={{ fontSize: "13px", lineHeight: 1.5, mt: 2 }}>
    {/* Datos del usuario */}
    <Typography><strong>Nombre:</strong> {usuario.nombre}</Typography>
    <Typography><strong>Apellido:</strong> {usuario.apellido}</Typography>
    <Typography><strong>Usuario:</strong> {usuario.username}</Typography>
    <Typography><strong>Teléfono:</strong> {usuario.phone}</Typography>
    <Typography><strong>Fecha de nacimiento:</strong> {usuario.birthday?.split("T")[0]}</Typography>
    <Typography><strong>Tipo de Usuario:</strong> {tipoCapitalizado}</Typography>
    <Typography sx={{ color: colorEstado, fontWeight: "bold", mt: 1 }}>
      Estado: <span style={{ fontWeight: "normal" }}>{estado}</span>
    </Typography>

    {/* Separador visual */}
    {isResidente && (
      <Box sx={{ borderTop: "1px solid #ccc", mt: 2, pt: 2 }}>
        <Typography sx={{ fontWeight: "bold", mb: 1 }}>Residencia Asignada:</Typography>
        <Typography><strong>Calle:</strong> {house.address?.street || "No disponible"}</Typography>
        <Typography><strong>Ciudad:</strong> {house.address?.city || "No disponible"}</Typography>
        <Typography><strong>Código Postal:</strong> {house.address?.zip || "No disponible"}</Typography>

        {house?.photo && (
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <img
              src={`http://localhost:4000/uploads/${house.photo}`}
              alt="Casa"
              style={{
                width: "auto",
                height: "190px",
                objectFit: "cover",
                borderRadius: "6px",
                border: "1px solid #ccc"
              }}
            />
          </Box>
        )}
      </Box>
    )}
  </Box>
</DialogContent>


      <DialogActions>
        <Button onClick={onClose} variant="contained" size="small">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisualizarUsuarioModal;
