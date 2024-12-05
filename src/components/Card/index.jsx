import { Card } from "flowbite-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function CardUser({ user }) {
  const iniciales =
    user.usuario.nombre[0].toUpperCase() +
    user.usuario.apellido[0].toUpperCase();

  const str = user.usuario.departamento.acronimo.replace(/[\[\]\s]/g, "");

  return (
    <Card className="max-w-sm h-full grow border border-primary/20 shadow-lg  bg-gray-100">
      <div className="flex flex-col  items-center pb-10">
        <div
          alt="Foto perfil"
          className="mb-3 bg-primary text-white font-bold h-[100px] w-[100px] flex items-center justify-center rounded-full shadow-2xl"
        >
          <span className=" text-4xl">{iniciales}</span>
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user.usuario.userName}
        </h5>

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.usuario.nombre} {user.usuario.apellido}
        </span>
        <div className="mt-4 flex space-x-3 lg:mt-6">
          <a
            href="#"
            className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Editar
          </a>
          <a
            href="#"
            className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
          >
            Salir
          </a>
        </div>
          <Link className="mt-4 font-semibold text-primary text-xl" to={`/bandejaentrada`}>Bandeja de Entrada Gral</Link>
          {/* <Link className="mt-4 font-semibold text-primary text-xl" to={`/bandejaentrada/${str}/${}`}>bandeja de Entrada Personal</Link> */}
      </div>
    </Card>
  );
}

export default CardUser;
