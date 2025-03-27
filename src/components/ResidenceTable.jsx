import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const ResidenceTable = ({ onEdit }) => {
  const [houses, setHouses] = useState([]);

  const fetchHouses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/houses/list");
      setHouses(response.data);
    } catch (error) {
      console.error("Error al obtener residencias:", error);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleToggleStatus = async (house) => {
    try {
      const formData = new FormData();
      formData.append("adress", house.adress);
      formData.append("description", house.description);
      formData.append("preferences", house.preferences);
      formData.append("enabled", !house.enabled); // Cambiar estado
      formData.append("file", new Blob()); // ← necesario para no enviar null

      await axios.put(`http://localhost:8080/api/v1/houses/update/${house.id}`, formData);
      fetchHouses(); // Recargar tabla
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead sx={{ backgroundColor: "#7a4d2b" }}>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Dirección</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Descripción</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Preferencias</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Estado</TableCell>
            <TableCell sx={{ fontWeight: "bold", color: "white" }}>Operaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {houses.map((house, index) => (
    <TableRow key={house.id || `house-${index}`}>
      <TableCell>{house.adress}</TableCell>
      <TableCell>{house.description}</TableCell>
      <TableCell>{house.preferences}</TableCell>
      <TableCell style={{ color: house.enabled ? "green" : "red", fontWeight: "bold" }}>
        {house.enabled ? "Activo" : "Inactivo"}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(house)}>
          <EditIcon />
        </IconButton>
        {house.enabled && (
          <IconButton onClick={() => handleToggleStatus(house)}>
            <DeleteIcon />
          </IconButton>
        )}
      </TableCell>
    </TableRow>
  ))}
  {houses.length === 0 && (
    <TableRow>
      <TableCell colSpan={5} align="center">
        No hay residencias registradas.
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
    </TableContainer>
  );
};

export default ResidenceTable;
