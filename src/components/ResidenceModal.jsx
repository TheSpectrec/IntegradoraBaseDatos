import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
  Box,
  Divider,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  adress: Yup.string().required("La dirección es obligatoria"),
  description: Yup.string().required("La descripción es obligatoria"),
  preferences: Yup.string().required("Las preferencias son obligatorias"),
});

const ResidenceModal = ({ open, onClose, residence, onSave }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const isEditMode = Boolean(residence);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("adress", values.adress);
      formData.append("description", values.description);
      formData.append("preferences", values.preferences);
      formData.append("enabled", values.enabled);
      if (file) formData.append("file", file);
  
      // Aquí validamos si es edición o nuevo
      if (house && house.id) {
        await axios.put(`http://localhost:8080/api/v1/houses/update/${house.id}`, formData);
      } else {
        await axios.post("http://localhost:8080/api/v1/houses/save", formData);
      }
  
      setSuccessMessage("Residencia guardada correctamente");
      onSave(); // Notificar al padre
      onClose();
    } catch (error) {
      setErrorMessage("Error al guardar la residencia");
      console.error("Error al guardar la residencia:", error);
    }
  };
  

  const initialValues = {
    adress: residence?.adress || "",
    description: residence?.description || "",
    preferences: residence?.preferences || "",
    file: null,
    enabled: residence?.enabled ?? true,
  };

  useEffect(() => {
    if (residence?.photo) {
      setPreviewImage(`http://localhost:8080/api/v1/houses/uploads/${residence.photo}`);
    } else {
      setPreviewImage(null);
    }
  }, [residence]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
        {isEditMode ? "Editar Residencia" : "Registrar Nueva Residencia"}
      </DialogTitle>
      <Divider sx={{ backgroundColor: "#ccc", height: "1px", marginBottom: "20px" }} />
      <DialogContent sx={{ padding: "40px", backgroundColor: "#fff" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="adress"
                    label="Dirección *"
                    error={touched.adress && Boolean(errors.adress)}
                    helperText={touched.adress && errors.adress}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="description"
                    label="Descripción *"
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                    sx={{ mt: 2 }}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="preferences"
                    label="Preferencias *"
                    error={touched.preferences && Boolean(errors.preferences)}
                    helperText={touched.preferences && errors.preferences}
                    sx={{ mt: 2 }}
                  />
                  {isEditMode && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={values.enabled}
                          onChange={(e) => setFieldValue("enabled", e.target.checked)}
                        />
                      }
                      label="Activo"
                      sx={{ mt: 2 }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    {isEditMode ? "Cambiar imagen" : "Subir imagen"}
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        setFieldValue("file", file);
                        setPreviewImage(URL.createObjectURL(file));
                      }}
                    />
                  </Button>

                  {previewImage && (
                    <Box
                      sx={{
                        mt: 2,
                        width: "100%",
                        height: "220px",
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        overflow: "hidden",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={previewImage}
                        alt="Previsualización"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: "#d9534f", color: "white", mr: 3 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#5cb85c", color: "white" }}>
                  {isEditMode ? "Guardar Cambios" : "Registrar"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>

      {/* Notificaciones */}
      <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={3000} onClose={() => setErrorMessage(null)}>
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default ResidenceModal;
