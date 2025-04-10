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
import { keyframes } from "@mui/system";

// Animaciones definidas
const fadeSlideIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const backgroundShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.96);
  }
  100% {
    transform: scale(1);
  }
`;
// Al inicio del componente
const clickSound = new Audio("/sounds/click.mp3"); // Ruta pública


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

      const { success, data } = response.data;

      if (success && data.tipoUsuario === "ADMIN") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("id", data._id);
        navigate("/users", { replace: true });
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
        background: "linear-gradient(270deg, #7A4A32, #CBCABE)",
        backgroundSize: "400% 400%",
        animation: `${backgroundShift} 15s ease infinite`,
        position: "relative",
        overflow: "hidden"
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
          justifyContent: "center",
          zIndex: 1
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="black">
          CONTROL DE VISITAS
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="black">
          A FRACCIONAMIENTO
        </Typography>
      </Box>

      {/* Logo con animación */}
      <Box
        sx={{
          position: "absolute",
          top: 15,
          left: 20,
          animation: `${float} 3s ease-in-out infinite`,
          zIndex: 2
        }}
      >
        <img src="../src/assets/img/LOGOTIPO.png" alt="Logo" style={{ height: "60px" }} />
      </Box>

      {/* Card con animación */}
      <Card
        sx={{
          width: 420,
          backgroundColor: "#CBCABE",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.3)",
          borderRadius: "20px",
          animation: `${fadeSlideIn} 0.8s ease-out`,
          padding: 2,
          marginTop: "100px",
          zIndex: 3
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
                InputProps={{ style: { backgroundColor: "#fff", borderRadius: 8 } }}
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
                  style: { backgroundColor: "#fff", borderRadius: 8 },
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
  onMouseDown={() => {
    clickSound.play(); // sonido
    if (navigator.vibrate) navigator.vibrate(50); // vibración
  }}
  sx={{
    backgroundColor: "#71795B",
    color: "white",
    fontWeight: "bold",
    padding: "10px",
    borderRadius: "12px",
    letterSpacing: "1px",
    fontSize: "16px",
    transition: "transform 0.2s ease",
    "&:hover": {
      backgroundColor: "#5c6345"
    },
    "&:active": {
      animation: `${pulse} 0.3s ease`
    }
  }}
>
  INGRESAR
</Button>


          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginAdmin;
