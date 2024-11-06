import { useState } from "react";
import { getSociedad } from "../api/sociedad.js";
import {
  getTramites,
  getPdfBinario,
  getTramitesDigitalizados,
} from "../api/tramites.js";

function Busqueda() {
  const [correlativo, setCorrelativo] = useState("");
  const [sociedad, setSociedad] = useState();
  const [tramites, setTramites] = useState([]);
  const [nroTramite, setNroTramite] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);

  // CONVERTIR PDF A BLOB
  const base64ToBlob = (base64, contentType = "application/pdf") => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: contentType });
  };

  const buscarSociedad = async (e) => {
    e.preventDefault();

    setPdfUrl();
    const modelo = {
      correlativo: correlativo,
    };
    console.log(modelo);
    const rsp = await getTramitesDigitalizados(modelo);
    setTramites(rsp.data.data);
    console.log(tramites);
  };

  const buscarTramite = async (tramitepdf) => {
    const response = await getPdfBinario(tramitepdf);
    const base64Data = response.data.data;
    const pdfBlob = base64ToBlob(base64Data);
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

  return (
    <div className="bg-gray-200 h-full w-full flex flex-col items-center">
      <h2 className="text-primary text-3xl font-bold">
        Busqueda de sociedades
      </h2>

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

      <div className="w-full flex justify-around">
        <table>
          <thead>
            <tr>
              <th>Nro. Tramite</th>
              <th>Código Tramite</th>
              <th>Tipo Tramite</th>
              <th>Correlativo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tramites.map((tramite, i) => (
              <tr key={i}>
                <td>{tramite.tramite.nroTramite}</td>
                <td>{tramite.tramite.codigoTramite}</td>
                <td>{tramite.tramite.tipoTramite}</td>
                <td>{tramite.tramite.correlativo}</td>
                <td>
                  <button onClick={() => buscarTramite(tramite)}>
                    {tramite.escaneado != null || tramite.protocolo != null
                      ? "Ver PDF"
                      : ""}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* {sociedad ? (
        <div className="flex flex-col">
        <span>{sociedad.razonSocial}</span>
        <span>{sociedad.correlativo}</span>
        <span>{sociedad.codigoTipoSocietario}</span>
        <span>{sociedad.tipoSocietario}</span>
        <span>{sociedad.cuil}</span>
        </div>
      ) : (
        <div></div>
      )} */}
        {pdfUrl && (
          <div className="mt-4">
            <h3 className="text-xl">Visualizar PDF:</h3>
            <iframe
              src={pdfUrl}
              className=" w-[800px] h-[650px]"
              title="Vista previa del PDF"
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
}

export default Busqueda;
