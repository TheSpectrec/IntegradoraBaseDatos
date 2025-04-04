import React, { useState, useEffect } from "react";
import CrearButton from "../components/CrearButton";
import UserTable from "../components/UserTable";
import UserModal from "../components/UserModal"; // Asegúrate que exportes correctamente
import EditUserModal from "../components/EditUserModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

const GestionUsuarios = () => {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [roleFilter, setRoleFilter] = useState("Residente");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [casas, setCasas] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/api/houses")
      .then((res) => setCasas(Array.isArray(res.data) ? res.data : res.data.data || []))
      .catch(() => setCasas([]));

    const storedId = localStorage.getItem("pendingHouseId");
    if (storedId) {
      setOpenCreateModal(true);
      localStorage.removeItem("pendingHouseId");
    }
  }, []);

  const handleUserAdded = () => setRefresh(prev => !prev);
  const handleUserUpdated = () => setRefresh(prev => !prev);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEditModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await axios.put(`http://localhost:4000/api/users/status/${selectedUser._id}`);
      setRefresh(prev => !prev);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, backgroundColor: '#D9D7CC', maxHeight: '100vh', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', color: 'black' }}>Gestión de Usuarios</h2>

          <div style={{
            background: '#F1F1F1',
            borderRadius: '20px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            padding: '1.5rem',
            width: '90%',
            maxWidth: '900px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <CrearButton onClick={() => setOpenCreateModal(true)} />
              <div style={{ display: "flex", gap: "1rem" }}>
                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Filtrar por estado</InputLabel>
                  <Select
                    value={statusFilter}
                    label="Filtrar por estado"
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Activo">Activos</MenuItem>
                    <MenuItem value="Inactivo">Inactivos</MenuItem>
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 150 }}>
                  <InputLabel>Filtrar por rol</InputLabel>
                  <Select
                    value={roleFilter}
                    label="Filtrar por rol"
                    onChange={(e) => setRoleFilter(e.target.value)}
                  >
                    <MenuItem value="Residente">Residentes</MenuItem>
                    <MenuItem value="Guardia">Guardias</MenuItem>
                    <MenuItem value="Admin">Administradores</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>

            <UserTable
              key={refresh}
              statusFilter={statusFilter}
              category={roleFilter}
              onDelete={handleDeleteUser}
              onEdit={handleEditUser}
            />
          </div>
        </div>
      </div>

      {/* Modales */}
      <UserModal
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        onUserAdded={handleUserAdded}
      />

      <EditUserModal
        open={openEditModal}
        onClose={() => setOpenEditModal(false)}
        onSave={handleUserUpdated}
        user={selectedUser}
        casas={casas}
      />

      <ConfirmDeleteModal
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={handleConfirmDelete}
  tipo="usuario"
  activo={selectedUser?.enabled}
/>

    </div>
  );
};

export default GestionUsuarios;
