import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import EditUserModal from "./EditUserModal";

const UserTable = ({ onDelete, statusFilter, category }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/users/list");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => setEditingUser(user);
  const handleCloseEdit = () => {
    setEditingUser(null);
    fetchUsers(); // Refrescar después de editar
  };

  const filteredUsers = users.filter((user) => {
    const matchTipo = user.tipoUsuario === category;
    const matchEstado =
      statusFilter === "Todos"
        ? true
        : statusFilter === "Activo"
        ? user.enabled
        : !user.enabled;
    return matchTipo && matchEstado;
  });

  return (
    <>
      <TableContainer component={Paper} elevation={0}>
        <Table>
          <TableHead sx={{ backgroundColor: "#7a4d2b" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Nombre</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Apellidos</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Teléfono</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Operaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.username}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{`${user.paternal} ${user.maternal}`}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  {user.enabled && (
                    <IconButton onClick={() => onDelete(user)}>
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay usuarios registrados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={handleCloseEdit}
          onSave={fetchUsers} // refresca tabla después de guardar
        />
      )}
    </>
  );
};

export default UserTable;
