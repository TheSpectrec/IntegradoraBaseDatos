import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button,
  MenuItem, Snackbar, Alert, Box, Divider,
  Select, FormControl, InputLabel, Grid
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/users/save";

// Validación con Yup
const validationSchema = Yup.object({
  username: Yup.string().required("El nombre de usuario es obligatorio"),
  password: Yup.string().min(6, "Mínimo 6 caracteres").required("La contraseña es obligatoria"),
  name: Yup.string().required("El nombre es obligatorio"),
  paternal: Yup.string().required("El apellido paterno es obligatorio"),
  maternal: Yup.string().required("El apellido materno es obligatorio"),
  phone: Yup.string().matches(/^\d+$/, "Solo números").min(10, "Deben ser 10 dígitos").required("El teléfono es obligatorio"),
  birthday: Yup.date().required("La fecha de nacimiento es obligatoria"),
  tipoUsuario: Yup.string().oneOf(["Residente", "Guardia"], "Tipo de usuario inválido").required("El tipo de usuario es obligatorio"),
});

const RegisterModal = ({ open, onClose, onUserAdded }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post(API_URL, {
        ...values,
        enabled: true
      });
      setSuccessMessage("Usuario registrado correctamente");
      resetForm();
      onClose();
      if (onUserAdded) onUserAdded();
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrorMessage("Error al registrar el usuario");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
        Registro de Usuario
      </DialogTitle>
      <Divider sx={{ backgroundColor: "#ccc", height: "1px", marginBottom: "20px" }} />
      <DialogContent sx={{ padding: "40px", backgroundColor: "#fff" }}>
        <Formik
          initialValues={{
            username: "",
            password: "",
            name: "",
            paternal: "",
            maternal: "",
            phone: "",
            birthday: "",
            tipoUsuario: "Residente", // Valor inicial válido
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="username"
                    label="Usuario *"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    type="password"
                    name="password"
                    label="Contraseña *"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ mt: 2 }}
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Nombre *"
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={{ mt: 2 }}
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

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Tipo de Usuario *</InputLabel>
                    <Select
                      value={values.tipoUsuario}
                      label="Tipo de Usuario *"
                      onChange={(e) => setFieldValue("tipoUsuario", e.target.value)}
                      error={touched.tipoUsuario && Boolean(errors.tipoUsuario)}
                    >
                      <MenuItem value="Residente">Residente</MenuItem>
                      <MenuItem value="Guardia">Guardia</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: "#d9534f", color: "white", borderRadius: "10px", mr: 3 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#5cb85c", color: "white", borderRadius: "10px" }}>
                  Registrar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>

      {/* Éxito */}
      <Snackbar open={Boolean(successMessage)} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Error */}
      <Snackbar open={Boolean(errorMessage)} autoHideDuration={3000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error">
          {errorMessage}
        </Alert>
      </Snackbar>
    </Dialog>
  );
};

export default RegisterModal;
