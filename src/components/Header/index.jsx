import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext.jsx";

function Header() {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <div>
      <header className=" w-full bg-primary">
        <div className=" text-white flex items-center justify-around rounded-t-2xl">
          <div>
            <img
              src="IconoLunaFinal.png"
              className=" mt-1 w-[100px]"
              alt="IGJ Logo"
            />
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
            <div className="flex items-center gap-2">
              {/* <span className=" font-semibold">{user.nombre}</span> */}
              <button
                onClick={logout}
                className="bg-white px-4 py-2 text-primary font-bold rounded-full hover:bg-primary/50 hover:text-white "
              >
                <a href="/">Salir</a>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      </header>
    </div>
  );
}

export default Header;
