import { UseAuth } from "../../context/authContext.jsx";
import { Button, MegaMenu, Navbar, Avatar, Dropdown } from "flowbite-react";

function Header() {
  const { logout, user } = UseAuth();

  return (
    <MegaMenu className="w-full bg-primary text-white ">
      {user != null ? (
        <div className="flex w-full flex-wrap items-center justify-around ">
          <Navbar.Brand href="/">
            <img
              src="IconoLunaFinal.png"
              className=" mt-1 w-[100px]"
              alt="IGJ Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              LUNA
            </span>
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
                toggle={<>{user.usuario.departamento.descripcion}</>}
              >
                <ul className="">
                  <div className="space-y-4 p-4">
                    {user.rolFuncion.map((r, i) => (
                      <li key={i}>
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
              label={<Avatar alt="User settings" img="" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.usuario.userName}</span>
                <span className="block truncate text-sm font-medium">
                  {user.usuario.nombre} {user.usuario.apellido}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Inicio</Dropdown.Item>
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
              src="IconoLunaFinal.png"
              className=" mt-1 w-[100px]"
              alt="IGJ Logo"
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              LUNA
            </span>
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
