import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box
} from "@mui/material";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { motion } from "framer-motion";

const ConfirmDeleteModal = ({
  open,
  onClose,
  onConfirm,
  tipo = "registro",
  activo = true,
  message = ""
}) => {
  const esActivar = !activo;
  const tipoCapitalizado = tipo.charAt(0).toUpperCase() + tipo.slice(1).toLowerCase();

  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
    setNotificationOpen(true);
  };

  useEffect(() => {
    if (notificationOpen) {
      const timer = setTimeout(() => {
        setNotificationOpen(false);
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [notificationOpen, onClose]);

  const animationVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Modal de Confirmación */}
      <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: "center" }}>
          <Box display="flex" justifyContent="center">
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={animationVariants}
            >
              {esActivar ? (
                <CheckCircleOutline sx={{ fontSize: 60, color: "green" }} />
              ) : (
                <HighlightOff sx={{ fontSize: 60, color: "red" }} />
              )}
            </motion.div>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Typography variant="h6" align="center" fontWeight="bold" gutterBottom>
            {esActivar
              ? `¿Deseas reactivar este ${tipoCapitalizado}?`
              : `¿Deseas desactivar este ${tipoCapitalizado}?`}
          </Typography>
          <Typography align="center">
            {message ||
              (esActivar
                ? `Estás a punto de volver a habilitar este ${tipo}.`
                : `Estás a punto de desactivar temporalmente este ${tipo}.`)}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleConfirm}
            sx={{
              backgroundColor: esActivar ? "#28a745" : "#d9534f",
              color: "white",
              borderRadius: "5px",
              padding: "6px 16px",
              '&:hover': {
                backgroundColor: esActivar ? "#218838" : "#c82333",
              }
            }}
          >
            {esActivar ? "ACTIVAR" : "DESACTIVAR"}
          </Button>
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              color: "#007bff",
              borderColor: "#007bff",
              borderRadius: "5px",
              padding: "6px 16px",
              '&:hover': {
                backgroundColor: "#f1f1f1"
              }
            }}
          >
            CANCELAR
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de éxito */}
      <Dialog open={notificationOpen} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            <CheckCircleOutline sx={{ fontSize: 80, color: "green" }} />
          </motion.div>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Operación realizada con éxito
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmDeleteModal;
