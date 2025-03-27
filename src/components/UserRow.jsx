import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import EditUserModal from "./EditUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const UserRow = ({ user }) => {
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell>{user.nombre}</TableCell>
        <TableCell>{user.apellidos}</TableCell>
        <TableCell>{user.correo}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton onClick={() => setOpenEditModal(true)} title="Editar usuario">
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => setOpenDeleteModal(true)} title="Eliminar usuario" sx={{ ml: 2 }}>
            <DeleteIcon sx={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Modales */}
      <EditUserModal open={openEditModal} onClose={() => setOpenEditModal(false)} user={user} />
      <ConfirmDeleteModal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)} />
    </>
  );
};

export default UserRow;
