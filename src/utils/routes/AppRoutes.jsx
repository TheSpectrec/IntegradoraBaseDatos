import { Routes, Route } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Residencias from "../../pages/Residencias";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Página de login como inicio */}
      <Route path="/" element={<Login />} />
      {/* Rutas con Sidebar */}
      <Route path="/home" element={<Home />} />
      <Route path="/residencias" element={<Residencias />} />
    </Routes>
  );
};

export default AppRoutes;
