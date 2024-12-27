import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Bandeja from "../components/BandejaEntrada/index.jsx";
import Loading from "../components/Loading/Loading.jsx";
import { UseAuth } from "../context/authContext.jsx";
import {
  GetTramitesDestinoRecibidos,
  GetTramitesSinRecibir,
} from "../api/Tramite.js";
import { getSubDestinos } from "../api/SubDestino.js";

const BandejaEntrada = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tramites, setTramites] = useState([]);
  const [destino, setDestino] = useState(null);
  const [subDestinos, setSubDestinos] = useState([]);
  const { user, userOracle } = UseAuth();

  
  useEffect(() => {
    // console.log(userOracle)
    cargarDatos();
  }, [userOracle]);
  
  const cargarDatos = async () => {
    if (userOracle && userOracle.length > 0) {
      const destinoInicial = userOracle[0].destino;
      setDestino(destinoInicial);

      try {
        setIsLoading(true);

        // Carga subdestinos
        const subDestinos = await getSubDestinos(destinoInicial);
        setSubDestinos(subDestinos.data);

        // Carga trámites
        const [response, rsp] = await Promise.all([
          GetTramitesSinRecibir(destinoInicial),
          GetTramitesDestinoRecibidos({ codigoDestino: destinoInicial }),
        ]);

        // console.log(response)
        // console.log(rsp)
        let tramitesCargados = response.data || [];
        if (rsp.data) {
          tramitesCargados = [...tramitesCargados, ...rsp.data];
        }

        setTramites(tramitesCargados);
        setIsLoading(false);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Hubo un problema con la conexión",
        });
        setIsLoading(false);
      }
    }
  };


  // Cambiar destino manualmente
  const handleDestinoChange = (e) => {
    setDestino(e.target.value);
    cargarTramites(e.target.value);
  };

  const cargarTramites = async (codigoDestino) => {
    try {
      setIsLoading(true);

      // Carga trámites y subdestinos
      const subDestinos = await getSubDestinos(codigoDestino);
      setSubDestinos(subDestinos.data);

      const [response, rsp] = await Promise.all([
        GetTramitesSinRecibir(codigoDestino),
        GetTramitesDestinoRecibidos({ codigoDestino }),
      ]);

      let tramitesCargados = response.data || [];
      if (rsp.data) {
        tramitesCargados = [...tramitesCargados, ...rsp.data];
      }

      setTramites(tramitesCargados);
      setIsLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Hubo un problema con la conexión",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col gap-4 items-center">
      <div className="w-full bg-white flex justify-center gap-3 items-end py-1 mt-4 text-center">
        <h2
          className="text-primary text-3xl font-bold drop-shadow-xl"
          style={{ textShadow: "1px 1px 2px primary" }}
        >
          Despacho
        </h2>
        <select
          name="destinos"
          id="destinos"
          onChange={handleDestinoChange}
          className="p-2 border rounded-lg bg-gray-100 font-medium text-primary w-[100px] border-primary"
        >
          {userOracle && userOracle.length > 0 ? (
            userOracle.map((d, i) => (
              <option key={i} value={d.destino}>
                {d.destino}
              </option>
            ))
          ) : (
            <option value="">Sin destinos</option>
          )}
        </select>
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <Bandeja
          tramites={tramites}
          subDestinos={subDestinos}
          user={user}
          userOracle={userOracle}
          cargarDatos={cargarDatos}
        />
      )}
    </div>
  );
};

export default BandejaEntrada;
