import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import Topbar from "../components/Topbar";
import ResidenceTable from "../components/ResidenceTable";
import ResidenceModal from "../components/ResidenceModal";

const Residencias = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (house) => {
    setSelectedHouse(house);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedHouse(null);
    setOpenModal(false);
  };

  const handleSave = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <Box sx={{ width: "100%", height: "100vh", backgroundColor: "#CBCABE" }}>
      <Topbar />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "calc(100vh - 80px)" }}>
        <Box sx={{ width: "90%", maxWidth: "1000px", backgroundColor: "white", borderRadius: "20px", padding: 2 }}>
          <Box display="flex" justifyContent="flex-start" mb={2}>
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
              CREAR NUEVA
            </Button>
          </Box>

          <ResidenceTable key={refresh} onEdit={handleEdit} />

          <ResidenceModal
            open={openModal}
            onClose={handleCloseModal}
            residence={selectedHouse}
            onSave={handleSave}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Residencias;
