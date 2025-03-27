import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { motion } from "framer-motion";

function ConfirmDeleteModal({ open, onClose, onConfirm, message }) {
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm(); // espera si onConfirm es async
    }
    setNotificationOpen(true);
  };

  useEffect(() => {
    if (notificationOpen) {
      const timer = setTimeout(() => {
        setNotificationOpen(false);
        onClose(); // cierra el modal después de mostrar éxito
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
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            <HighlightOffIcon sx={{ fontSize: 80, color: "red" }} />
          </motion.div>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            ¿Estás seguro?
          </Typography>
          <Typography variant="body2">{message}</Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "20px" }}>
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Eliminar
          </Button>
          <Button variant="outlined" onClick={onClose}>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notificación de éxito */}
      <Dialog open={notificationOpen} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
          </motion.div>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 2 }}>
            Operación realizada con éxito
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ConfirmDeleteModal;
