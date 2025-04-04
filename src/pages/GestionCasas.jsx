import React, { useState, useEffect } from 'react';
import CrearButton from '../components/CrearButton';
import CasaTable from '../components/CasaTable';
import CasaModal from '../components/CasaModal';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import VisualizarCasaModal from '../components/VisualizarCasaModal';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { axiosFormData } from "../config/axiosConfig";

const GestionCasas = () => {
  const [casas, setCasas] = useState([]);
  const [selectedCasa, setSelectedCasa] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [filtroEstado, setFiltroEstado] = useState("todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const casasPorPagina = 20;

  const fetchCasas = async () => {
    try {
      const { data } = await axiosFormData.get("/houses");
      const houses = Array.isArray(data) ? data : data.data;
      setCasas(houses || []);
    } catch (error) {
      console.error("Error al obtener casas:", error);
      setCasas([]);
    }
  };

  useEffect(() => {
    fetchCasas();
  }, []);

  const handleToggleStatus = async (casa) => {
    try {
      await axiosFormData.put(`/houses/status/${casa._id}`);
      fetchCasas();
    } catch (error) {
      console.error('Error al cambiar estado:', error);
    }
  };

  const handleEdit = (casa) => {
    setSelectedCasa(casa);
    setModalOpen(true);
  };

  const handleView = (casa) => {
    setSelectedCasa(casa);
    setViewModalOpen(true);
  };

  const handleDeleteConfirm = (casa) => {
    setSelectedCasa(casa);
    setConfirmDeleteOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCasa(null);
    setModalOpen(false);
  };

  const handleViewClose = () => {
    setSelectedCasa(null);
    setViewModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCasa) return;
    await handleToggleStatus(selectedCasa);
    setConfirmDeleteOpen(false);
  };

  const casasFiltradas = casas.filter(casa => {
    if (filtroEstado === "todas") return true;
    return casa.status === filtroEstado;
  });

  const totalPaginas = Math.ceil(casasFiltradas.length / casasPorPagina);
  const casasPaginadas = casasFiltradas.slice(
    (paginaActual - 1) * casasPorPagina,
    paginaActual * casasPorPagina
  );

  const cambiarPagina = (nuevaPagina) => setPaginaActual(nuevaPagina);

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, backgroundColor: '#D9D7CC', Height: '100vh', width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
          <h2 style={{ textAlign: 'center', color: 'black' }}>Gestión de Residencias</h2>
          <div style={{
            background: '#F1F1F1',
            borderRadius: '20px',
            boxShadow: '0 3px 6px rgba(0,0,0,0.16)',
            padding: '1.5rem',
            width: '90%',
            maxWidth: '900px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <CrearButton onClick={() => setModalOpen(true)} />
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Filtrar por estado</InputLabel>
                <Select
                  value={filtroEstado}
                  label="Filtrar por estado"
                  onChange={(e) => setFiltroEstado(e.target.value)}
                >
                  <MenuItem value="todas">Todas</MenuItem>
                  <MenuItem value="activo">Activas</MenuItem>
                  <MenuItem value="inactivo">Inactivas</MenuItem>
                </Select>
              </FormControl>
            </div>

            <CasaTable
              casas={casasPaginadas}
              onEdit={handleEdit}
              onToggle={handleDeleteConfirm}
              onView={handleView}
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onPaginaChange={cambiarPagina}
              totalRegistros={casasFiltradas.length}
            />
          </div>
        </div>
      </div>

      <CasaModal open={modalOpen} onClose={handleModalClose} residence={selectedCasa} onSave={fetchCasas} />
      <VisualizarCasaModal open={viewModalOpen} onClose={handleViewClose} casa={selectedCasa} />
      <ConfirmDeleteModal
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        message={`Ubicación: ${selectedCasa?.address?.street}, ${selectedCasa?.address?.city}`}
        isActive={selectedCasa?.status === "activo"}
      />
    </div>
  );
};

export default GestionCasas;
