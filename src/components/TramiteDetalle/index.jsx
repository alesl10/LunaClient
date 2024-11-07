import {
  getPdfBinario,
} from "../../api/Archivo.js";


function TramiteDetalle({tramites, setPdfUrl, pdfUrl}) {


  const buscarTramite = async (tramitepdf) => {
    const response = await getPdfBinario(tramitepdf);
    const base64Data = response.data;
    const pdfBlob = base64ToBlob(base64Data);
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
  };

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

  return(
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

  );
}

export default TramiteDetalle;
