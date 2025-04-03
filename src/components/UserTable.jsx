import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, Pagination, Box, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import EditUserModal from './EditUserModal';
import VisualizarUserModal from './VisualizarUserModal';
import { axiosInstance } from '../config/axiosConfig';

const UserTable = ({ statusFilter, category, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const usuariosPorPagina = 20;

  useEffect(() => {
    fetchUsers();
  }, [statusFilter, category]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("http://localhost:4000/api/users", {
        params: {
          estado: statusFilter !== "Todos" ? statusFilter : null
        }
      });
      const data = Array.isArray(res.data) ? res.data : res.data.data;
      setUsers(data || []);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
      setUsers([]);
    }
  };

  const usuariosFiltrados = users.filter((user) => {
    const porRol = category === "Todos" || user.tipoUsuario === category.toUpperCase();
    const porEstado = statusFilter === "Todos" || (statusFilter === "Activo" ? user.enabled : !user.enabled);
    return porRol && porEstado;
  });

  const totalPaginas = Math.ceil(usuariosFiltrados.length / usuariosPorPagina);
  const usuariosPaginados = usuariosFiltrados.slice(
    (paginaActual - 1) * usuariosPorPagina,
    paginaActual * usuariosPorPagina
  );

  return (
    <Box>
      <Paper elevation={0} sx={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
        <TableContainer sx={{ maxHeight: 280, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={stickyStyle}>Nombre</TableCell>
                <TableCell sx={stickyStyle}>Apellido</TableCell>
                <TableCell sx={stickyStyle}>Usuario</TableCell>
                <TableCell sx={stickyStyle}>Estado</TableCell>
                <TableCell sx={stickyStyle}>Operaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usuariosPaginados.length > 0 ? (
                usuariosPaginados.map((user) => (
                  <TableRow key={user._id} hover>
                    <TableCell>{user.nombre}</TableCell>
                    <TableCell>{user.apellido}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell sx={{ color: user.enabled ? "green" : "red", fontWeight: "bold" }}>
                      {user.enabled ? "Activo" : "Inactivo"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => setViewingUser(user)} title="Ver detalles">
                        <VisibilityIcon sx={{ color: "#1976d2" }} />
                      </IconButton>
                      <IconButton onClick={() => setEditingUser(user)} title="Editar">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(user)} title={user.enabled ? "Desactivar" : "Activar"}>
                        <DeleteIcon sx={{ color: user.enabled ? "red" : "gray" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No hay usuarios registrados.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={(e, val) => setPaginaActual(val)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        color="primary"
      />

      <Typography variant="subtitle2" align="right" sx={{ mb: 1, color: '#555' }}>
        Mostrando {usuariosPaginados.length} de {usuariosFiltrados.length} registros
      </Typography>

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={() => setEditingUser(null)}
          onSave={fetchUsers}
        />
      )}

      {viewingUser && (
        <VisualizarUserModal
          open={!!viewingUser}
          onClose={() => setViewingUser(null)}
          usuario={viewingUser}
        />
      )}
    </Box>
  );
};

const stickyStyle = {
  position: 'sticky',
  top: 0,
  backgroundColor: '#8B4E2F',
  color: 'white',
  fontWeight: 'bold'
};

export default UserTable;
