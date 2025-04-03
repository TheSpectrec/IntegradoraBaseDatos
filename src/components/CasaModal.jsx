import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button,
  Grid, Box, Divider
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import { axiosFormData } from "../config/axiosConfig"; // usa form-data

const validationSchema = Yup.object({
  calle: Yup.string().required("La calle es obligatoria"),
  ciudad: Yup.string().required("La ciudad es obligatoria"),
  codigoPostal: Yup.string()
    .matches(/^\d{5}$/, "Debe tener 5 dígitos")
    .required("El código postal es obligatorio"),
  descripcion: Yup.string().required("La descripción es obligatoria"),
});

const CasaModal = ({ open, onClose, residence, onSave }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const isEditMode = Boolean(residence && residence._id);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("street", values.calle);
      formData.append("city", values.ciudad);
      formData.append("zip", values.codigoPostal);
      formData.append("description", values.descripcion);
      formData.append("status", values.enabled ? "activo" : "inactivo");

      if (values.file) {
        formData.append("photo", values.file);
      }

      const url = isEditMode
        ? `/houses/with-photo/${residence._id}`
        : "/houses/with-photo";

      const method = isEditMode ? "put" : "post";
      await axiosFormData[method](url, formData);

      setSuccessMessage(isEditMode ? "Casa actualizada correctamente" : "Casa registrada correctamente");
      onSave();
      onClose();
    } catch (error) {
      console.error("Error al guardar la casa:", error);
      setErrorMessage("Error al guardar la casa");
    }
  };

  useEffect(() => {
    if (!open) setPreviewImage(null);
  }, [open]);

  useEffect(() => {
    if (residence?.photo) {
      setPreviewImage(`http://localhost:4000/uploads/${residence.photo}`);
    } else {
      setPreviewImage(null);
    }
  }, [residence]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const initialValues = {
    calle: residence?.address?.street || "",
    ciudad: residence?.address?.city || "",
    codigoPostal: residence?.address?.zip || "",
    descripcion: residence?.description || "",
    file: null,
    enabled: residence?.status === "activo"
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {isEditMode ? "Editar Casa" : "Registrar Nueva Casa"}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ padding: "40px" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Field
                      as={TextField}
                      fullWidth
                      name="calle"
                      label="Calle *"
                      error={touched.calle && Boolean(errors.calle)}
                      helperText={touched.calle && errors.calle}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="ciudad"
                      label="Ciudad *"
                      error={touched.ciudad && Boolean(errors.ciudad)}
                      helperText={touched.ciudad && errors.ciudad}
                      sx={{ mt: 2 }}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="codigoPostal"
                      label="Código Postal *"
                      error={touched.codigoPostal && Boolean(errors.codigoPostal)}
                      helperText={touched.codigoPostal && errors.codigoPostal}
                      sx={{ mt: 2 }}
                    />
                    <Field
                      as={TextField}
                      fullWidth
                      name="descripcion"
                      label="Descripción *"
                      error={touched.descripcion && Boolean(errors.descripcion)}
                      helperText={touched.descripcion && errors.descripcion}
                      sx={{ mt: 2 }}
                    />
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
      </Dialog>

      {/* Modal de confirmación */}
      <Dialog open={Boolean(successMessage)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ textAlign: "center", padding: "20px" }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
          >
            <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
          </motion.div>
          <Box sx={{ mt: 2 }}>
            <strong>{successMessage}</strong>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CasaModal;
