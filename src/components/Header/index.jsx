import { UseAuth } from "../../context/authContext.jsx";
import { Button, MegaMenu, Navbar, Avatar, Dropdown } from "flowbite-react";

function Header() {
  const { logout, user } = UseAuth();

  return (
    <MegaMenu className="w-full bg-primary text-white ">
      {user != null ? (
        <div className="flex w-full flex-wrap items-center justify-around ">
          <Navbar.Brand href="/">
            <img src="nuevoLogo.png" className=" w-[80px]" alt="IGJ Logo" />
            <img src="luna5.png" className=" mt-1 w-[200px]" alt="Luna Logo" />
          </Navbar.Brand>
          <div className="order-2 hidden items-center md:flex gap-4">
            <div className="flex items-center ">
              <img
                src="logo-bandera-escudo.svg"
                className="mr-3 w-[150px]"
                alt="Argentina logo"
              />
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
              <MegaMenu.Dropdown
                toggle={
                  <div className="flex flex-col">
                    <span>{user.usuario.userName}</span>
                    <span>{user.usuario.departamento.descripcion}</span>
                  </div>
                }
              >
                <ul className="">
                  <div className="space-y-4 p-4">
                    {user.rolFuncion.map((r, i) => (
                      <li
                        className="hover:bg-primary/70 hover:text-white "
                        key={i}
                      >
                        <a
                          href={r.funcion.url}
                          className="hover:text-primary text-wrap dark:hover:text-primary-500"
                        >
                          {r.funcion.nombre}
                        </a>
                      </li>
                    ))}
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </Navbar.Collapse>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div
                  alt="Foto perfil"
                  className="mb-3 bg-secondary text-primary font-bold h-[50px] w-[50px] flex items-center justify-center rounded-full shadow-2xl"
                >
                  <span className="">
                    {user.usuario.nombre[0].toUpperCase()}
                    {user.usuario.apellido[0].toUpperCase()}
                  </span>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.usuario.userName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.usuario.nombre} {user.usuario.apellido}
                </span>
              </Dropdown.Header>
              <Dropdown.Item href="/home">Inicio</Dropdown.Item>
              <Dropdown.Item>Editar Datos</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => logout()}>Salir</Dropdown.Item>
            </Dropdown>
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-wrap items-center justify-around ">
          <Navbar.Brand href="/">
            <img
              src="nuevoLogo.png"
              className=" mt-1 w-[80px]"
              alt="IGJ Logo"
            />
            <img src="luna5.png" className=" mt-1 w-[200px]" alt="Luna Logo" />
          </Navbar.Brand>
          <div className="order-2 hidden items-center md:flex gap-4">
            <div className="flex items-center ">
              <img
                src="logo-bandera-escudo.svg"
                className="mr-3 w-[150px]"
                alt="Argentina logo"
              />
            </div>
            <Navbar.Toggle />
          </div>
        </div>
      )}
    </MegaMenu>
  );
}

export default Header;
