import Bandeja from "../components/BandejaEntrada/index.jsx";
import { useEffect, useState } from "react";
import {
  GetTramitesDestinoRecibidos,
  GetTramitesSinRecibir,
} from "../api/Tramite.js";
import { getDestinosDepartamento } from "../api/Destinos.js";
import Loading from "../components/Loading/Loading.jsx";
import { UseAuth } from "../context/authContext.jsx";

const BandejaEntrada = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [destinos, setDestinos] = useState([]);
  const [tramites, setTramites] = useState([]);
  const [destino, setDestino] = useState();
  const [selectedDestino, setSelectedDestino] = useState({ codigoDestino: "" });

  const { user } = UseAuth();

  useEffect(() => {
    if (user) {
      destinosDpto(user.usuario.departamento.id);
    }
  }, [user]);

  useEffect(() => {
    if (destino) {
      cargarTramites(destino);
    }
  }, [destino]);


  const destinosDpto = async (id) => {
    const response = await getDestinosDepartamento(id);
    if (response && response.data) {
      setDestinos(response.data);
      cargarTramites(response.data[0].acronimo);
    }
  };

  const cargarTramites = async (destino) => {
    setIsLoading(true);
    try {
      const response = await GetTramitesSinRecibir(destino);
      // console.log(response);
      const rsp = await GetTramitesDestinoRecibidos({codigoDestino:destino})
      setTramites(response.data);
      // console.log(rsp.data)
      setTramites((prev) => [...prev, ...rsp.data])
      
      console.log(tramites)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleDestinoChange = (e) => {
    setDestino(e.target.value);
    // setSelectedDestino({ codigoDestino: e.target.value });
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col gap-4 items-center">
      <div className="w-full bg-white flex justify-center gap-3 items-end  py-1 mt-4 text-center">
        <h2 className="text-primary text-3xl font-bold drop-shadow-xl " style={{ textShadow: "1px 1px 2px primary" }}>
          Despacho
        </h2>
        <select
          name="destinos"
          id="destinos"
          // value={selectedDestino}
          onChange={handleDestinoChange} // Llama al manejador al cambiar el valor
          className="p-2 border rounded-lg bg-gray-100 font-medium text-primary w-[100px] border-primary"
        >
          {destinos.map((d, i) => (
            <option  key={i} value={d.acronimo}>
              {d.acronimo}
            </option>
          ))}
        </select>
      </div>
      {isLoading ? <Loading /> : <Bandeja tramites={tramites} />}
    </div>
  );
};

export default BandejaEntrada;
