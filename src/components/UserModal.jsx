import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button,
  MenuItem, Snackbar, Alert, Box, Divider,
  Select, FormControl, InputLabel, Grid
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  phone: Yup.string().matches(/^\d+$/, "Solo números").min(10).required(),
  birthday: Yup.date().required(),
  tipoUsuario: Yup.string().oneOf(["ADMIN", "RESIDENTE", "GUARDIA"]).required(),
  house_id: Yup.string().nullable(),
});

const UserModal = ({ open, onClose, onUserAdded }) => {
  const [houses, setHouses] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4000/api/houses")
      .then(res => {
        // 👇 Esta es la línea clave
        const housesData = Array.isArray(res.data)
          ? res.data
          : Array.isArray(res.data.data)
          ? res.data.data
          : [];
        setHouses(housesData);
      })
      .catch(err => {
        console.error("Error al obtener casas:", err);
        setHouses([]);
      });
  }, []);
  

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        username: values.username,
        password: values.password,
        phone: values.phone,
        birthday: new Date(values.birthday).toISOString().split("T")[0],
        tipoUsuario: values.tipoUsuario.toUpperCase(),
        house_id: values.tipoUsuario === "RESIDENTE" ? values.house_id || null : null,
        enabled: true
      };

      await axios.post("http://localhost:4000/api/users/save", payload);
      setSuccessMessage("Usuario registrado correctamente");
      resetForm();
      onClose();
      onUserAdded?.();
    } catch (err) {
      console.error("Error al registrar:", err);
      setErrorMessage(err?.response?.data?.error || "Error al registrar el usuario");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
        Registro de Usuario
      </DialogTitle>
      <Divider sx={{ backgroundColor: "#ccc", height: "1px", mb: 2 }} />
      <DialogContent sx={{ p: 4, backgroundColor: "#fff" }}>
        <Formik
          initialValues={{
            nombre: "", apellido: "", username: "", contrasena: "",
            phone: "", birthday: "", tipoUsuario: "RESIDENTE", house_id: ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="nombre" label="Nombre *" fullWidth
                    error={touched.nombre && !!errors.nombre} helperText={touched.nombre && errors.nombre} />
                  <Field as={TextField} name="apellido" label="Apellido *" fullWidth sx={{ mt: 2 }}
                    error={touched.apellido && !!errors.apellido} helperText={touched.apellido && errors.apellido} />
                  <Field as={TextField} name="username" label="Usuario *" fullWidth sx={{ mt: 2 }}
                    error={touched.username && !!errors.username} helperText={touched.username && errors.username} />
                  <Field as={TextField} name="password" label="Contraseña *" type="password" fullWidth sx={{ mt: 2 }}
                    error={touched.password && !!errors.password} helperText={touched.password && errors.password} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Field as={TextField} name="phone" label="Teléfono *" fullWidth
                    error={touched.phone && !!errors.phone} helperText={touched.phone && errors.phone} />
                  <Field as={TextField} name="birthday" type="date" label="Nacimiento *" fullWidth sx={{ mt: 2 }}
                    InputLabelProps={{ shrink: true }} error={touched.birthday && !!errors.birthday}
                    helperText={touched.birthday && errors.birthday} />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Tipo de Usuario</InputLabel>
                    <Select name="tipoUsuario" value={values.tipoUsuario} onChange={(e) => {
                      setFieldValue("tipoUsuario", e.target.value);
                      if (e.target.value !== "RESIDENTE") setFieldValue("house_id", "");
                    }}>
                      <MenuItem value="RESIDENTE">Residente</MenuItem>
                      <MenuItem value="GUARDIA">Guardia</MenuItem>
                      <MenuItem value="ADMIN">Administrador</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }} disabled={values.tipoUsuario !== "RESIDENTE"}>
                    <InputLabel>Residencia</InputLabel>
                    <Select
                      name="house_id"
                      value={values.house_id || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value=""><em>Sin residencia</em></MenuItem>
                      {Array.isArray(houses) && houses.map((h) => (
                        <MenuItem key={h._id} value={h._id}>
                          {h.address?.street}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
                <Button onClick={onClose} variant="contained" sx={{ backgroundColor: "#d9534f", mr: 3 }}>
                  Cancelar
                </Button>
                <Button type="submit" variant="contained" sx={{ backgroundColor: "#5cb85c" }}>
                  Registrar
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>

      <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage(null)}>
        <Alert onClose={() => setSuccessMessage(null)} severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar open={!!errorMessage} autoHideDuration={3000} onClose={() => setErrorMessage(null)}>
        <Alert onClose={() => setErrorMessage(null)} severity="error">{errorMessage}</Alert>
      </Snackbar>
    </Dialog>
  );
};

export default UserModal;
