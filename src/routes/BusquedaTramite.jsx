import { useState } from "react";
import {
  getTramites,
  getTramitesDigitalizados,
} from "../api/Tramite.js";
import TramiteDetalle from "../components/TramiteDetalle/index.jsx";

function BusquedaTramite() {
  const [correlativo, setCorrelativo] = useState("");
  const [tramites, setTramites] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);


  const buscarSociedad = async (e) => {
    e.preventDefault();

    setPdfUrl();
    const modelo = {
      correlativo: correlativo,
    };
    const rsp = await getTramitesDigitalizados(modelo);
    setTramites(rsp.data.data);
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col items-center">
      <h2 className="text-primary text-3xl font-bold">Busqueda de tramites</h2>

      <div className="border-2 rounded-lg">
        <form className="flex gap-2 items-center" onSubmit={buscarSociedad}>
          <label className="font-semibold text-2xl">Correlativo:</label>
          <input
            onChange={(e) => setCorrelativo(e.target.value)} // Aquí se maneja el cambio de estado correctamente
            value={correlativo}
            placeholder="Correlativo"
            type="text"
            className="rounded-md px-2 text-lg"
          />
          <button className="px-4 font-semibold bg-blue-500 text-yellow-300 rounded-md">
            Buscar
          </button>
        </form>
      </div>
      <TramiteDetalle tramites={tramites} setPdfUrl={setPdfUrl} pdfUrl={pdfUrl}/>
    </div>
  );
}

export default BusquedaTramite;
