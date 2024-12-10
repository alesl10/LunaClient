import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import BusquedaSociedades from "../pages/BusquedaSociedades";
import BusquedaTramite from "../pages/BusquedaTramite";
import TipoTramite from "../pages/TipoTramite";
import Destinos from "../pages/Destinos";
import Usuarios from "../pages/Usuarios";
import Roles from "../pages/Roles";
import Funciones from "../pages/Funciones";
import BandejaEntrada from "../pages/BandejaEntrada";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<Layout />}>
        <Route path="home" element={<Home />} />
        <Route path="busquedaexp" element={<BusquedaSociedades />} />
        <Route path="busquedatramites" element={<BusquedaTramite />} />
        <Route
          path="busquedatramites/:correlativo"
          element={<BusquedaTramite />}
        />
        <Route path="tipostramite" element={<TipoTramite />} />
        <Route path="destinos" element={<Destinos />} />
        <Route path="AdministradorUsuarios" element={<Usuarios />} />
        <Route path="roles" element={<Roles />} />
        <Route path="AdministradorFunciones" element={<Funciones />} />
        <Route path="BandejaEntrada" element={<BandejaEntrada />} />
        <Route
          path="*"
          element={
            <div className="w-full h-full text-4xl bg-white text-center flex justify-center items-center">
              <img src="/assets/images/404_page-not-found-1024x576.webp" alt="" />
            </div>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
