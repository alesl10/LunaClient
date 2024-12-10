import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import { getTramitesDigitalizados } from "../api/Tramite.js";
import ListaTramites from "../components/Lists/Tramites.jsx";
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Hubo un problema con la conexión",
      });
      setIsLoading(false)
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
    <div className="bg-gray-200 h-full w-full flex flex-col gap-3 items-center">
      <div className="w-full bg-white p-2 my-4 text-center  ">
        <h2 className="text-primary text-3xl font-bold drop-shadow-xl">
          Busqueda de Tramites
        </h2>
      </div>

      <div className="border-2 flex gap-2 justify-around rounded-lg items-center">
        <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setCorrelativo(e.target.value)} // Manejamos el cambio del correlativo
            value={correlativo}
            placeholder="Correlativo"
            type="text"
            className="rounded-md px-2 text-lg"
          />
          <button className="px-4  py-2 font-semibold bg-blue-500 text-yellow-300 rounded-md hover:saturate-50 ">
            Buscar
          </button>
        </form>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2  font-semibold bg-red-800 text-white rounded-md hover:saturate-50 "
        >
          volver
        </button>
       
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
