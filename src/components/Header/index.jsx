import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";
import { Navbar } from "flowbite-react";

function Header() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <div>
      <header className=" w-full bg-primary">
        <div className=" text-white flex items-center justify-around rounded-t-2xl">
          <div className="flex items-center gap-2 font-extrabold text-4xl">
              <img
                src="IconoLunaFinal.png"
                className=" mt-1 w-[100px]"
                alt="IGJ Logo"
              />
            <a href="/">
              <span>LUNA</span>
            </a>
          </div>
          <div className="flex items-center ">
            <img
              src="logo-bandera-escudo.svg"
              className="mr-3 w-[150px]"
              alt="Argentina logo"
            />
            <span className=" text-lg fw-bolder">
              2024 - Año de la Defensa de la Vida, la Libertad y la Propiedad
            </span>
          </div>
          {isAuthenticated ? (
            <Navbar fluid rounded className=" bg-primary ">
              <div className="flex md:order-2">
                <Navbar.Toggle />
              </div>
              <Navbar.Collapse>
                <Navbar.Link className="text-white" href="/busquedasociedades">
                  Buscar Sociedades
                </Navbar.Link>
                <Navbar.Link className="text-white" href="/busquedatramites">
                  Buscar Tramites
                </Navbar.Link>
                <button onClick={logout}>
                  <a href="/">Salir</a>
                </button>
              </Navbar.Collapse>
            </Navbar>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
