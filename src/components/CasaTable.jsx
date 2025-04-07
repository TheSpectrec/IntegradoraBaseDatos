import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, IconButton, Paper, Box, Typography, Pagination
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const CasaTable = ({
  casas, onEdit, onToggle, onView,
  paginaActual, totalPaginas, onPaginaChange, totalRegistros
}) => {
  return (
    <Box>
      <Paper elevation={0} sx={{ borderRadius: '10px', overflow: 'hidden', border: '1px solid #ddd' }}>
        <TableContainer sx={{ maxHeight: 280, overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={stickyStyle}>Dirección</TableCell>
                <TableCell sx={stickyStyle}>Ciudad</TableCell>
                <TableCell sx={stickyStyle}>Código Postal</TableCell>
                <TableCell sx={stickyStyle}>Estado</TableCell>
                <TableCell sx={stickyStyle}>Operaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casas.length > 0 ? (
                casas.map((casa) => (
                  <TableRow key={casa._id} hover>
                    <TableCell>{casa.address?.street || "Sin dirección"}</TableCell>
                    <TableCell>{casa.address?.city}</TableCell>
                    <TableCell>{casa.address?.zip}</TableCell>
                    <TableCell sx={{ color: casa.status === "activo" ? "green" : "red", fontWeight: "bold" }}>
                      {casa.status === "activo" ? "Activa" : "Inactiva"}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => onView(casa)} title="Ver detalles">
                        <VisibilityIcon sx={{ color: "#1976d2" }} />
                      </IconButton>
                      <IconButton title="Editar" onClick={() => onEdit(casa)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        title={casa.status === "activo" ? "Desactivar" : "Activar"}
                        onClick={() => onToggle(casa)}
                      >
                        {casa.status === "activo" ? (
                          <BlockIcon sx={{ color: "red" }} />
                        ) : (
                          <CheckCircleIcon sx={{ color: "green" }} />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No hay casas registradas.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Pagination
        count={totalPaginas}
        page={paginaActual}
        onChange={(e, value) => onPaginaChange(value)}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        color="primary"
      />

      <Typography variant="subtitle2" align="right" sx={{ mt: 1, color: '#555' }}>
        Mostrando {casas.length} de {totalRegistros} registros
      </Typography>
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

export default CasaTable;
