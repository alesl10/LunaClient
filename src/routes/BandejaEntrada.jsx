import Bandeja from "../components/BandejaEntrada/index.jsx";
import { useEffect, useState } from "react";
import { GetTramitesDestino } from "../api/Tramite.js";
import Loading from "../components/Loading/Loading.jsx";
import { useParams } from "react-router-dom";

const BandejaEntrada = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [tramites, setTramites] = useState([]);
  
  const {area: str, usuario:dest } = useParams();
  

  useEffect(() => {
    if (str) {
      const destino = { CodigoDestino: str, usuarioDestino: dest };
      console.log(destino)
      cargarTramites(destino);
    }
  }, [str]);

  const cargarTramites = async (destino) => {
    setIsLoading(true);
    const response = await GetTramitesDestino(destino);
    setTramites(response.data);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col gap-4 items-center">
      {str ? (
        <div className="w-full bg-white p-2 my-4 text-center  ">
          <h2 className="text-primary text-3xl font-bold drop-shadow-xl">
            Bandeja {str}
          </h2>
        </div>
      ) : (
        ""
      )}
      {isLoading ? <Loading /> : <Bandeja tramites={tramites} />}
    </div>
  );
};

export default BandejaEntrada;
