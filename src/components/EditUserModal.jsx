import React, { useState, useEffect } from "react";
import {
  Dialog, DialogTitle, DialogContent, TextField, Button, Grid,
  Snackbar, Alert, Box, Divider, MenuItem, Select, FormControl, InputLabel
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object({
  nombre: Yup.string().required("El nombre es obligatorio"),
  apellido: Yup.string().required("El apellido es obligatorio"),
  username: Yup.string().required("El usuario es obligatorio"),
  password: Yup.string().required("La contraseña es obligatoria"),
  phone: Yup.string().matches(/^\d+$/, "Solo números").min(10).required("El teléfono es obligatorio"),
  birthday: Yup.date().required("La fecha de nacimiento es obligatoria"),
  tipoUsuario: Yup.string().oneOf(["ADMIN", "RESIDENTE", "GUARDIA"]).required("El tipo es obligatorio"),
  enabled: Yup.boolean().required("El estado es obligatorio"),
  house_id: Yup.string().nullable(),
});

const EditUserModal = ({ open, onClose, user, onSave }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [houses, setHouses] = useState([]);

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
  
  

  if (!user) return null;

  const handleSubmit = async (values) => {
    try {
      const payload = {
        nombre: values.nombre,
        apellido: values.apellido,
        username: values.username,
        password: values.password,
        phone: values.phone,
        birthday: new Date(values.birthday).toISOString().split("T")[0],
        tipoUsuario: values.tipoUsuario.toUpperCase(),
        enabled: values.enabled,
        house_id: values.tipoUsuario === "RESIDENTE" ? values.house_id || null : null
      };

      await axios.put(`http://localhost:4000/api/users/update/${user._id}`, payload);
      setSuccessMessage("Usuario actualizado correctamente");
      onSave?.();
      onClose();
    } catch (err) {
      console.error("Error al actualizar usuario:", err);
      setErrorMessage(err?.response?.data?.error || "Error al actualizar el usuario");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
        Editar Usuario
      </DialogTitle>
      <Divider sx={{ backgroundColor: "#ccc", height: "1px", mb: 2 }} />
      <DialogContent sx={{ p: 4, backgroundColor: "#fff" }}>
        <Formik
          initialValues={{
            nombre: user?.nombre || "",
            apellido: user?.apellido || "",
            username: user?.username || "",
            password: user?.password || "",
            phone: user?.phone || "",
            birthday: user?.birthday?.split("T")[0] || "",
            tipoUsuario: user?.tipoUsuario || "RESIDENTE",
            enabled: user?.enabled ?? true,
            house_id: user?.house_id?._id || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, errors, touched, handleChange, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="nombre" label="Nombre *" value={values.nombre}
                    onChange={handleChange} error={touched.nombre && !!errors.nombre}
                    helperText={touched.nombre && errors.nombre} />
                  <TextField fullWidth name="apellido" label="Apellido *" value={values.apellido}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.apellido && !!errors.apellido}
                    helperText={touched.apellido && errors.apellido} />
                  <TextField fullWidth name="username" label="Usuario *" value={values.username}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username} />
                  <TextField fullWidth name="password" label="Contraseña *" type="password" value={values.password}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password} />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField fullWidth name="phone" label="Teléfono *" value={values.phone}
                    onChange={handleChange} error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone} />
                  <TextField fullWidth type="date" name="birthday" label="Nacimiento *"
                    InputLabelProps={{ shrink: true }} value={values.birthday}
                    onChange={handleChange} sx={{ mt: 2 }} error={touched.birthday && !!errors.birthday}
                    helperText={touched.birthday && errors.birthday} />

                  <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel>Tipo de Usuario</InputLabel>
                    <Select name="tipoUsuario" value={values.tipoUsuario} onChange={(e) => {
                      setFieldValue("tipoUsuario", e.target.value);
                      if (e.target.value !== "RESIDENTE") setFieldValue("house_id", "");
                    }}>
                      <MenuItem value="ADMIN">Administrador</MenuItem>
                      <MenuItem value="RESIDENTE">Residente</MenuItem>
                      <MenuItem value="GUARDIA">Guardia</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth sx={{ mt: 2 }} disabled={values.tipoUsuario !== "RESIDENTE"}>
                    <InputLabel>Residencia</InputLabel>
                    <Select name="house_id" value={values.house_id || ""} onChange={handleChange}>
                      <MenuItem value=""><em>Sin residencia</em></MenuItem>
                      {houses.map((h) => (
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
                  Guardar Cambios
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

export default EditUserModal;
