import { useState } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { UseAuth } from "../../context/authContext.jsx";
import MenuFunciones from "../MenuFunciones";

const Aside = ({ viewAside, setViewAside }) => {
  const [date, setDate] = useState(new Date());
  const mes = date.toLocaleString("es-ES", { month: "long" });
  const numeroDia = date.getDate();
  const diaSemana = date.toLocaleString("es-ES", { weekday: "long" });
  const { user } = UseAuth();

  return (
    <div>
      <FaArrowCircleRight
        onClick={() => setViewAside(!viewAside)}
        className={`absolute m-3 size-8 ${
          viewAside ? "" : "hidden"
        } cursor-pointer transition-all `}
      />

      <aside
        className={`transition-all h-full bg-gray-100 hidden  flex-col items-center p-10 shadow-md border-x-4 ${
          !viewAside ? "lg:hidden" : "lg:flex"
        } `}
      >
        {/* // calendario */}
        <div className="w-32 flex-none rounded  lg:rounded-t-none lg:rounded-l text-center shadow-lg ">
          <div className="block rounded-xl overflow-hidden  text-center bg-blue-600 ">
            <div className="bg-blue text-white py-1">{mes}</div>
            <div className="pt-1 border-l border-r border-white bg-white">
              <span className="text-5xl font-bold leading-tight">
                {numeroDia}
              </span>
            </div>
            <div className="border-l border-r border-b rounded-b-lg text-center border-white bg-white py-2 -mb-1">
              <span className="text-sm text-primary font-semibold">
                {diaSemana}
              </span>
            </div>
          </div>
        </div>

        {location.pathname.toLowerCase() == "/home"  ? (
          <div className="flex flex-col gap-2 mt-2">
            <h5 className="font-semibold text-center text-primary text-2xl">
              Enlaces Internos
            </h5>
            <div>
              <a href="http://intranetigj/" target="_blank">
                <img
                  className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
                  src="IntranetJUS.jpg"
                  alt=""
                />
              </a>
              <a
                href="https://intranet.jus.gob.ar/sistemas/la-ley-next/"
                target="_blank"
              >
                <img
                  className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
                  src="La Ley Next.jpg"
                  alt=""
                />
              </a>
              <a
                href="https://cas.gde.gob.ar/acceso/login/?generateToken=true&generateIDP=true&/"
                target="_blank"
              >
                <img
                  className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
                  src="GDE-01.jpg"
                  alt=""
                />
              </a>
              <a href="https://borges.jus.gob.ar/" target="_blank">
                <img
                  className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
                  src="Borges1-01.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 mt-2">
            <h5 className="font-semibold text-center text-primary text-2xl">
              Enlaces Internos
            </h5>
            {user != null ? (
              user.rolFuncion.map((r, i) => (
                <a
                  className="text-wrap dark:hover:text-primary-500 shadow-sm shadow-primary bg-primary/10 w-[250px] rounded-md px-2 py-1 hover:bg-primary hover:text-white"
                  key={i}
                  href={r.funcion.url}
                >
                  {r.funcion.nombre}
                </a>
              ))

            ) : ""}
          </div>
        )}
      </aside>
    </div>
  );
};

export default Aside;
