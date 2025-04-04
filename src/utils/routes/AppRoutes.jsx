import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import GestionCasas from "../../pages/GestionCasas";
import GestionUsuarios from "../../pages/GestionUsuarios";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página de login como inicio */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas solo para ADMIN */}
      <Route element={<ProtectedRouteAdmin />}>
        <Route path="/users" element={<GestionUsuarios />} />
        <Route path="/houses" element={<GestionCasas />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
