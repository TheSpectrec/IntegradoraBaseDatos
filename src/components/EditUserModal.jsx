import React from "react";
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  name: Yup.string().required("El nombre es obligatorio"),
  paternal: Yup.string().required("El apellido paterno es obligatorio"),
  maternal: Yup.string().required("El apellido materno es obligatorio"),
  phone: Yup.string()
    .matches(/^\d+$/, "Solo números")
    .min(10, "Deben ser 10 dígitos")
    .required("El teléfono es obligatorio"),
  birthday: Yup.date().required("La fecha de nacimiento es obligatoria"),
  enabled: Yup.boolean().required("El estado es obligatorio"),
});

const EditUserModal = ({ open, onClose, user, onSave }) => {
  const [successMessage, setSuccessMessage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState(null);

  if (!user) return null;

  const handleSubmit = async (values) => {
    try {
      const updatedUser = { ...user, ...values };
      await axios.put("http://localhost:8080/api/v1/users/update", updatedUser);
      setSuccessMessage("Usuario actualizado correctamente");
      onSave(); // Notificar al padre para actualizar la tabla
      onClose();
    } catch (error) {
      setErrorMessage("Error al actualizar el usuario");
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
        Editar Usuario
      </DialogTitle>
      <Divider sx={{ backgroundColor: "#ccc", height: "1px", marginBottom: "20px" }} />
      <DialogContent sx={{ padding: "40px", backgroundColor: "#fff" }}>
        <Formik
          initialValues={{
            name: user.name || "",
            paternal: user.paternal || "",
            maternal: user.maternal || "",
            phone: user.phone || "",
            birthday: user.birthday || "",
            enabled: user.enabled ?? true,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Nombre *"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="paternal"
                    label="Apellido Paterno *"
                    error={touched.paternal && Boolean(errors.paternal)}
                    helperText={touched.paternal && errors.paternal}
                    sx={{ mt: 2 }}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="maternal"
                    label="Apellido Materno *"
                    error={touched.maternal && Boolean(errors.maternal)}
                    helperText={touched.maternal && errors.maternal}
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="phone"
                    label="Teléfono *"
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    type="date"
                    name="birthday"
                    label="Fecha de Nacimiento *"
                    InputLabelProps={{ shrink: true }}
                    error={touched.birthday && Boolean(errors.birthday)}
                    helperText={touched.birthday && errors.birthday}
                    sx={{ mt: 2 }}
                  />
                  {/* Campo para activar/desactivar */}
                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Estado *</InputLabel>
                    <Select
                      name="enabled"
                      value={values.enabled}
                      label="Estado *"
                      onChange={(e) => setFieldValue("enabled", e.target.value === "true")}
                    >
                      <MenuItem value="true">Activo</MenuItem>
                      <MenuItem value="false">Inactivo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: "#d9534f", color: "white", borderRadius: "10px", mr: 3 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#5cb85c", color: "white", borderRadius: "10px" }}>
                  Guardar Cambios
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

export default EditUserModal;
