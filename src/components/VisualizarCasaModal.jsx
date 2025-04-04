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

const VisualizarCasaModal = ({ open, onClose, casa }) => {
  if (!casa) return null;

  const direccion = casa?.address
    ? `${casa.address.street}, ${casa.address.city}, ${casa.address.zip}`
    : "No disponible";

  const estado = casa.status === "activo" ? "Activo" : "Inactivo";
  const colorEstado = casa.status === "activo" ? "green" : "red";

  const urlImagen = casa.photo
    ? `http://localhost:4000/uploads/${casa.photo}`
    : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalles de la Casa</DialogTitle>

      <DialogContent sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
        <Box sx={{ flexGrow: 1, maxWidth: 300 }}>
          <Typography><strong>Dirección:</strong> {direccion}</Typography>
          <Typography><strong>Descripción:</strong> {casa.description}</Typography>
          <Typography sx={{ color: colorEstado, mt: 1 }}>
            <strong>Estado:</strong> {estado}
          </Typography>
        </Box>

        {urlImagen && (
          <Box>
            <img
              src={urlImagen}
              alt="Casa"
              style={{
                width: "160px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "10px",
                border: "1px solid #ccc"
              }}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VisualizarCasaModal;
