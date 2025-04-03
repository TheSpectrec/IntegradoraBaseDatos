import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditUserModal from "./EditUserModal";
import VisualizarUserModal from "./VisualizarUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const UserRow = ({ user, onToggle }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  return (
    <>
      <TableRow hover>
        <TableCell>{user.nombre}</TableCell>
        <TableCell>{user.apellido}</TableCell>
        <TableCell>{user.username}</TableCell>
        <TableCell sx={{ color: user.enabled ? "green" : "red", fontWeight: "bold" }}>
          {user.enabled ? "Activo" : "Inactivo"}
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton onClick={() => setOpenViewModal(true)} title="Ver usuario">
            <VisibilityIcon sx={{ color: "#1976d2" }} />
          </IconButton>
          <IconButton onClick={() => setOpenEditModal(true)} title="Editar usuario">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => setOpenConfirmModal(true)} title={user.enabled ? "Desactivar" : "Activar"}>
            <DeleteIcon sx={{ color: user.enabled ? "red" : "gray" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Modales */}
      <EditUserModal
        user={user}
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={() => setOpenEditModal(false)} // Se puede mejorar si se pasa un refresh
      />

      <VisualizarUserModal
        usuario={user}
        open={openViewModal}
        onClose={() => setOpenViewModal(false)}
      />

      <ConfirmDeleteModal
        open={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        onConfirm={() => {
          onToggle(user);
          setOpenConfirmModal(false);
        }}
        tipo="usuario"
        activo={user.enabled}
      />
    </>
  );
};

export default UserRow;
