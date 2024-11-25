import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import Header from "./components/Header";
import FooterLuna from "./components/Footer";
import Layout from "./components/Layout";
//rutas
import Home from "./routes/Home.jsx";
import Login from "./routes/Login.jsx";
import BusquedaSociedades from "./routes/BusquedaSociedades.jsx";
import BusquedaTramite from "./routes/BusquedaTramite.jsx";
import TipoTramite from "./routes/TipoTramite.jsx";
import Destinos from "./routes/Destinos.jsx";
import Usuarios from "./routes/Usuarios.jsx";
import "@fontsource-variable/onest";
import Roles from "./routes/Roles.jsx";
import Funciones from "./routes/Funciones.jsx";
import BandejaEntrada from "./routes/BandejaEntrada.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="relative flex flex-col justify-between h-svh">
          <div className="absolute w-full h-full bg-black/20 -z-10"></div>
          <img
            src="semana_18.jpg"
            alt=""
            className="absolute w-full h-full -z-20"
          />
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/busquedaexp" element={<BusquedaSociedades />} />
              <Route path="/busquedatramites" element={<BusquedaTramite />} />
              <Route
                path="/busquedatramites/:correlativo"
                element={<BusquedaTramite />}
              />
              <Route path="/tipostramite" element={<TipoTramite />} />
              <Route path="/destinos" element={<Destinos />} />
              <Route path="/AdministradorUsuarios" element={<Usuarios />} />
              <Route path="/roles" element={<Roles />} />
              <Route path="/funciones" element={<Funciones />} />
              <Route path="/BandejaEntrada/:area" element={<BandejaEntrada />} />
              <Route
                path="*"
                element={
                  <div className="w-full h-full text-4xl bg-white text-center flex justify-center items-center">
                    <img src="404_page-not-found-1024x576.webp" alt="" />
                  </div>
                }
              />
            </Route>
          </Routes>
          <FooterLuna />
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
