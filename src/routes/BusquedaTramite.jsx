import { useEffect, useState } from "react";
import { getTramites, getTramitesDigitalizados } from "../api/Tramite.js";
import ListaTramites from "../components/ListaTramites/index.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading/Loading.jsx";

function BusquedaTramite() {
  const [correlativo, setCorrelativo] = useState();
  const [tramites, setTramites] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { correlativo: correlativoUrl } = useParams();

  useEffect(() => {
    if (correlativoUrl) {
      setCorrelativo(correlativoUrl);
      buscarTramites(correlativoUrl);
    }
  }, [correlativoUrl]);

  const buscarTramites = async (correlativoBuscado) => {
    setIsLoading(true);
    try {
      setPdfUrl(null);
      const modelo = { correlativo: correlativoBuscado };
      const rsp = await getTramitesDigitalizados(modelo);
      setTramites(rsp.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error al buscar trámites:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (correlativo) {
      navigate(`/busquedatramites/${correlativo}`);
      buscarTramites(correlativo);
    }
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col items-center">
      <h2 className="text-primary text-3xl font-bold">Busqueda de tramites</h2>

      <div className="border-2 rounded-lg">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2  font-semibold bg-red-800 text-white rounded-md"
        >
          volver
        </button>
        <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
          <label className="font-semibold text-2xl">Correlativo:</label>
          <input
            onChange={(e) => setCorrelativo(e.target.value)} // Manejamos el cambio del correlativo
            value={correlativo}
            placeholder="Correlativo"
            type="text"
            className="rounded-md px-2 text-lg"
          />
          <button className="px-4  py-2 font-semibold bg-blue-500 text-yellow-300 rounded-md">
            Buscar
          </button>
        </form>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <ListaTramites
          tramites={tramites.sort()}
          setPdfUrl={setPdfUrl}
          pdfUrl={pdfUrl}
        />
      )}
    </div>
  );
}

export default BusquedaTramite;
