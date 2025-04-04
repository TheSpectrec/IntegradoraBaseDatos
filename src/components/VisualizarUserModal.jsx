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
      maxWidth={isResidente ? "xs" : "xs"}
      fullWidth
    >
      <DialogTitle sx={{ fontSize: "15px", pb: 0 }}>Detalles del Usuario</DialogTitle>

      <DialogContent>
        <Box sx={{ fontSize: "12.5px", lineHeight: 1.4 }}>
          <Typography><strong>Nombre:</strong> {usuario.nombre}</Typography>
          <Typography><strong>Apellido:</strong> {usuario.apellido}</Typography>
          <Typography><strong>Usuario:</strong> {usuario.username}</Typography>
          <Typography><strong>Teléfono:</strong> {usuario.phone}</Typography>
          <Typography><strong>Fecha de nacimiento:</strong> {usuario.birthday?.split("T")[0]}</Typography>
          <Typography><strong>Tipo de Usuario:</strong> {tipoCapitalizado}</Typography>
          <Typography sx={{ color: colorEstado, fontWeight: "bold", mt: 1 }}>
            Estado: <span style={{ fontWeight: "normal" }}>{estado}</span>
          </Typography>

          {isResidente && house && (
            <>
              <Typography sx={{ mt: 1, fontWeight: "bold" }}>Residencia Asignada:</Typography>
              <Typography><strong>Calle:</strong> {house.address?.street || "No disponible"}</Typography>
              <Typography><strong>Ciudad:</strong> {house.address?.city || "No disponible"}</Typography>
              <Typography><strong>Código Postal:</strong> {house.address?.zip || "No disponible"}</Typography>
            </>
          )}

          {isResidente && house?.photo && (
            <Box sx={{ textAlign: "center", mt: 1 }}>
              <img
                src={`http://localhost:4000/uploads/${house.photo}`}
                alt="Casa"
                style={{
                  width: "auto",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  marginTop: "8px"
                }}
              />
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
