import { useEffect, useState } from "react";
import { getSociedad } from "../api/Expediente.js";
import { getTipoSocietarios } from "../api/TipoSocietario.js";
import TablaSociedades from "../components/Lists/Sociedades.jsx";
import Loading from "../components/Loading/Loading.jsx";

function BusquedaSociedad() {
  const [sociedades, setSociedades] = useState([]);
  const [tipoSocietarios, setTipoSocietarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para modelo busqueda
  const [correlativo, setCorrelativo] = useState("");
  const [razonSocial, setRazonSocial] = useState("");
  const [codigoTipoSocietario, setCodigoTipoSocietario] = useState();
  const [error, setError] = useState();

  //obtener tipos societarios
  useEffect(() => {
    const obtenerTipos = async () => {
      const rsp = await getTipoSocietarios();
      setTipoSocietarios(rsp.data.data);
    };
    obtenerTipos();
  }, []);

  const handleSelectChange = (event) => {
    setCodigoTipoSocietario(event.target.value);
  };

  // Buscar sociedades
  const buscarSociedad = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const modelo = {
      correlativo: correlativo || null,
      razonSocial: razonSocial || null,
      codigoTipoSocietario: codigoTipoSocietario || null,
    };
    if (
      modelo.razonSocial != null ||
      modelo.correlativo != null ||
      modelo.codigoTipoSocietario != null
    ) {
      const rsp = await getSociedad(modelo);
      setSociedades(rsp.data.data);
      setCorrelativo("");
      setRazonSocial("");
      setCodigoTipoSocietario("");
      setIsLoading(false);
    } else {
      setError("Debe ingresar al menos un campo");
      setTimeout(() => {
        setError();
      }, 2000);
    }
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col gap-4 items-center">
      <div className="w-full bg-white p-2 my-4 text-center  ">
        <h2 className="text-primary text-3xl font-bold drop-shadow-xl">
          Busqueda de Sociedades
        </h2>
      </div>

      <div className=" rounded-lg">
        <div className=" bg-red-600 text-white">
          <p>{error}</p>
        </div>
        <form className="flex gap-2 " onSubmit={buscarSociedad}>
          <input
            onChange={(e) => setCorrelativo(e.target.value)} // Aquí se maneja el cambio de estado correctamente
            value={correlativo}
            placeholder="Correlativo"
            type="text"
            className="rounded-md px-2 text-lg"
          />
          <input
            onChange={(e) => setRazonSocial(e.target.value)}
            value={razonSocial}
            placeholder="razon Social"
            type="text"
            className="rounded-md px-2 text-lg"
          />
          <select
            value={codigoTipoSocietario} // Valor sincronizado con el estado
            onChange={handleSelectChange} // Actualiza el estado al cambiar la opción
            className="rounded-md px-2 text-lg"
          >
            <option value="">Seleccione un tipo</option>
            {tipoSocietarios.map((tipo, i) => (
              <option key={i} value={tipo.codigo}>
                {tipo.nombre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="px-4  font-semibold bg-blue-500 text-yellow-300 rounded-md"
          >
            Buscar
          </button>
        </form>
      </div>
      {isLoading ? <Loading /> : <TablaSociedades sociedades={sociedades} />}
    </div>
  );
}

export default BusquedaSociedad;
