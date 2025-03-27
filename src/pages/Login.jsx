import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password.length < 8) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    navigate("/home"); // Redirige a Home.jsx
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #7A4A32, #BBA996)",
      }}
    >
      {/* Encabezado con fondo de contraste */}
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
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black">
          CONTROL DE VISITAS
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="black">
          A FRACCIONAMIENTO
        </Typography>
      </Box>

      {/* Logo en la esquina superior izquierda */}
      <Box sx={{ position: "absolute", top: 15, left: 20 }}>
        <img src="../src/assets/img/LOGOTIPO.png" alt="Logo" style={{ height: "60px" }} />
      </Box>

      {/* Tarjeta de login */}
      <Card
        sx={{
          width: 400,
          backgroundColor: "#CBCABE",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.4)",
          borderRadius: 3,
          marginTop: "100px",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box mb={3}>
              <TextField
                fullWidth
                label="Correo"
                type="email"
                variant="outlined"
                placeholder="ejemplo@gmail.com"
                required
                InputProps={{
                  style: { backgroundColor: "#fff" }, // Fondo blanco para el input
                }}
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
                error={passwordError}
                helperText={passwordError ? "La contraseña debe tener al menos 8 caracteres." : ""}
                InputProps={{
                  style: { backgroundColor: "#fff" }, // Fondo blanco para el input
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordToggle} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#71795B",
                color: "white",
                "&:hover": { backgroundColor: "#5c6345" },
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

export default Login;
