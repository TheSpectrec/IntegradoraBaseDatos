import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";

import GestionCasas from "../../pages/GestionCasas";
import GestionUsuarios from "../../pages/GestionUsuarios";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página de login como inicio */}
      <Route path="/" element={<Login />} />
      {/* Rutas con Sidebar */}
      <Route path="/users" element={<GestionUsuarios />} />
      <Route path="/houses" element={<GestionCasas />} />
    </Routes>
  );
};

export default AppRoutes;
