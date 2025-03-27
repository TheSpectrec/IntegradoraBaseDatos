import React, { useState } from "react";
import { Box, Button, Select, MenuItem } from "@mui/material";
import Topbar from "../components/Topbar";
import UserTable from "../components/UserTable";
import RegisterModal from "../components/RegisterModal";
import ConfirmDeleteModal from "../components/ConfirmDeleteModal";
import axios from "axios";

const Home = () => {
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [roleFilter, setRoleFilter] = useState("Residente");
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserAdded = () => {
    setRefresh((prev) => !prev); // Forzar recarga de datos
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/users/delete/${selectedUser.username}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    } finally {
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#CBCABE" }}>
      <Topbar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 80px)",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "900px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: 2,
          }}
        >
          {/* Filtros y botón */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Button
              variant="contained"
              onClick={() => setOpenModal(true)}
              sx={{
                backgroundColor: "#80876d",
                color: "white",
                "&:hover": { backgroundColor: "#6c7750" },
                fontWeight: "bold",
                textTransform: "none",
                borderRadius: "8px",
              }}
            >
              CREAR NUEVO
            </Button>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ minWidth: 150, backgroundColor: "white", borderRadius: "8px" }}
              >
                <MenuItem value="Todos">Todos</MenuItem>
                <MenuItem value="Activo">Activo</MenuItem>
                <MenuItem value="Inactivo">Inactivo</MenuItem>
              </Select>

              <Select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                sx={{ minWidth: 150, backgroundColor: "white", borderRadius: "8px" }}
              >
                <MenuItem value="Residente">Residentes</MenuItem>
                <MenuItem value="Guardia">Guardias</MenuItem>
              </Select>
            </Box>
          </Box>

          {/* Tabla de usuarios */}
          <UserTable
            key={refresh} // Forzar recarga de datos
            statusFilter={statusFilter}
            roleFilter={roleFilter}
            onDelete={handleDeleteUser}
          />

          {/* Modal de registro */}
          <RegisterModal
            open={openModal}
            onClose={() => setOpenModal(false)}
            onUserAdded={handleUserAdded}
          />

<ConfirmDeleteModal
  open={openDeleteModal}
  onClose={() => setOpenDeleteModal(false)}
  onConfirm={async () => {
    try {
      const updatedUser = {
        ...selectedUser,
        enabled: false,
      };

      await axios.put("http://localhost:8080/api/v1/users/update", updatedUser);

      // Refrescar tabla después del cambio
      setRefresh((prev) => !prev);
      setOpenDeleteModal(false);
    } catch (error) {
      console.error("Error al desactivar usuario:", error);
    }
  }}
  message="¿Estás seguro de que deseas eliminar este usuario?"
/>

        </Box>
      </Box>
    </Box>
  );
};

export default Home;
