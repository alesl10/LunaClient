import React, { useEffect, useState } from "react";
import Loading from "../components/Loading/Loading.jsx";
import TiposTramites from "../components/TiposTramite/index.jsx";
import {
  getTiposTramites,
  getTiposTramitesByCodigo,
} from "../api/TipoTramite.js";

const TipoTramite = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tiposTramite, setTiposTramite] = useState([]);


  useEffect(() => {
    cargarTiposTramite();
  }, []);

  const cargarTiposTramite = async () => {
    setIsLoading(true);
    const response = await getTiposTramites();
    if (response.isSuccess == true) {
      setTiposTramite(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col gap-3 items-center">
      <h2 className="text-primary text-3xl font-bold">
        Consulta tipo de Tramite
      </h2>

      

      {isLoading ? <Loading /> : <TiposTramites tiposTramite={tiposTramite} />}
    </div>
  );
};

export default TipoTramite;
