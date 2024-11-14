import { useState } from "react";

const Aside = () => {
  const [date, setDate] = useState(new Date());
  const mes = date.toLocaleString("es-ES", { month: "long" });
  const numeroDia = date.getDate();
  const diaSemana = date.toLocaleString("es-ES", { weekday: "long" });

  return (
    <aside className=" h-full bg-gray-300 hidden lg:flex flex-col items-center p-10 shadow-md border-x-4 ">
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
            <span className="text-sm text-primary font-semibold">{diaSemana}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        <h5 className="font-semibold text-center text-primary text-2xl">
          Enlaces Internos
        </h5>
       
        <a href="http://intranetigj/" target="_blank">
          <img
            className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
            src="IntranetJUS.jpg"
            alt=""
          />
        </a>
        <a href="https://intranet.jus.gob.ar/sistemas/la-ley-next/" target="_blank">
          <img
            className="rounded-2xl p-2 shadow-lg hover:saturate-150 cursor-pointer w-[250px]"
            src="La Ley Next.jpg"
            alt=""
          />
        </a>
        <a href="https://cas.gde.gob.ar/acceso/login/?generateToken=true&generateIDP=true&/" target="_blank">
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
    </aside>
  );
};

export default Aside;
