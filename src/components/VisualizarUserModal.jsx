import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";

const VisualizarUsuarioModal = ({ open, onClose, usuario }) => {
  if (!usuario) return null;

  const estado = usuario.enabled ? "Activo" : "Inactivo";
  const colorEstado = usuario.enabled ? "green" : "red";

  const tipo = usuario.tipoUsuario?.toLowerCase().replace(/^./, c => c.toUpperCase());

  const house = usuario.house || usuario.house_id; // por si viene como house_id

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles del Usuario</DialogTitle>
      <DialogContent>
        <Typography><strong>Nombre:</strong> {usuario.nombre}</Typography>
        <Typography><strong>Apellido:</strong> {usuario.apellido}</Typography>
        <Typography><strong>Usuario:</strong> {usuario.username}</Typography>
        <Typography><strong>Teléfono:</strong> {usuario.phone}</Typography>
        <Typography><strong>Fecha de nacimiento:</strong> {usuario.birthday?.split("T")[0]}</Typography>
        <Typography><strong>Tipo de Usuario:</strong> {tipo}</Typography>
        <Typography sx={{ color: colorEstado, mt: 1 }}>
          <strong>Estado:</strong> {estado}
        </Typography>

        {house && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Residencia Asignada</Typography>
            <Typography><strong>Calle:</strong> {house.address?.street}</Typography>
            <Typography><strong>Ciudad:</strong> {house.address?.city}</Typography>
            <Typography><strong>Código Postal:</strong> {house.address?.zip}</Typography>

            {house.photo && (
              <Box
                component="img"
                src={`http://localhost:4000/uploads/${house.photo}`}
                alt="Imagen de la casa"
                sx={{
                  width: "200px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ccc"
                }}
              />
            )}
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisualizarUsuarioModal;
