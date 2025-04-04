import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
  InputAdornment
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handlePasswordToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || password.length < 8) {
      setErrorMsg("Campos inválidos o contraseña muy corta.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/users/login", {
        username,
        password
      });

      const { success, data, message } = response.data;

      if (success && data.tipoUsuario === "ADMIN") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("id", data._id);
        navigate("/users", { replace: true }); // redirige al dashboard del admin
      } else {
        setErrorMsg("No tienes permisos como administrador.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #7A4A32, #BBA996)",
        position: "relative"
      }}
    >
      {/* Encabezado */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100px",
          backgroundColor: "#CBCABE",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black">
          CONTROL DE VISITAS
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="black">
          A FRACCIONAMIENTO
        </Typography>
      </Box>

      {/* Logo */}
      <Box sx={{ position: "absolute", top: 15, left: 20 }}>
        <img src="../src/assets/img/LOGOTIPO.png" alt="Logo" style={{ height: "60px" }} />
      </Box>

      {/* Login card */}
      <Card
        sx={{
          width: 400,
          backgroundColor: "#CBCABE",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
          borderRadius: 3,
          marginTop: "100px"
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Usuario"
                type="text"
                variant="outlined"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{ style: { backgroundColor: "#fff" } }}
              />
            </Box>

            <Box mb={3}>
              <TextField
                fullWidth
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  style: { backgroundColor: "#fff" },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordToggle} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>

            {errorMsg && (
              <Typography color="error" variant="body2" mb={2}>
                {errorMsg}
              </Typography>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#71795B",
                color: "white",
                "&:hover": { backgroundColor: "#5c6345" }
              }}
            >
              Ingresar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginAdmin;
