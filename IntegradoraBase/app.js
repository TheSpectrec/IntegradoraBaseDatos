import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./src/database.js";

import houseRoutes from "./src/routes/house.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import rolRoutes from "./src/routes/rol.routes.js";
import visitRoutes from "./src/routes/visit.routes.js";

// Conexión a la base de datos
connectDB();

const app = express();
const PORT = 4000;

// Configuración básica
app.set("port", PORT);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json()); // para peticiones JSON
app.use(express.urlencoded({ extended: true })); // para formularios simples

// Servir imágenes o archivos estáticos
app.use("/uploads", express.static("uploads"));

// Rutas API
app.use("/api/users", userRoutes);           // JSON
app.use("/api/houses", houseRoutes);         // form-data
app.use("/api/roles", rolRoutes);            // JSON
app.use("/api/visits", visitRoutes);         // JSON

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
