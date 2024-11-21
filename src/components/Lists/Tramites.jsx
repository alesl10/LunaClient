import { getPdfBinario, getZipBalanceBinario } from "../../api/Archivo.js";
import { Table, Pagination, Modal, ModalFooter } from "flowbite-react";
import { useState } from "react";
import { FaFilePdf } from "react-icons/fa6";
import { GrDocumentZip } from "react-icons/gr";
import { format } from "date-fns"; // Importar date-fns para formatear la fecha

function ListaTramites({ tramites, setPdfUrl, pdfUrl }) {
  const [openModal, setOpenModal] = useState(false);
  const [nroTramitePDF, setNroTramitePDF] = useState("")

  // Configuración de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tramites.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  //funcion para descargar el zip balance
  const descargarBalance = async (balance) => {
    const response = await getZipBalanceBinario(balance);
    const zipBlob = base64ToBlob(response.data, "application/zip");

    const url = window.URL.createObjectURL(zipBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download =`${balance.timnrotram}.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
  };

  // Función para buscar el PDF del trámite
  const buscarTramite = async (tramitepdf) => {
    const response = await getPdfBinario(tramitepdf);
    const pdfBlob = base64ToBlob(response.data, "application/pdf");
    const url = URL.createObjectURL(pdfBlob);
    setNroTramitePDF(tramitepdf.tramite.nroTramite)
    setPdfUrl(url);
    setOpenModal(true);
  };

  // Convertir base64 a Blob
  const base64ToBlob = (base64, contentType) => {
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

  return (
    <div className="w-full p-5">
      {/* Tabla con la lista de trámites */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Tipo Tramite</Table.HeadCell>
          <Table.HeadCell>Nro. Tramite</Table.HeadCell>
          <Table.HeadCell>Código Tramite</Table.HeadCell>
          <Table.HeadCell>Fecha Registración</Table.HeadCell>
          <Table.HeadCell>Acción</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems.map((tramite, i) => {
            const fechaRegistracion = new Date(
              tramite.tramite.fechaRegistracion
            );
            const fechaFormateada = format(fechaRegistracion, "dd/MM/yyyy");

            return (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {tramite.tramite.tipoTramite}
                </Table.Cell>
                <Table.Cell>{tramite.tramite.nroTramite}</Table.Cell>
                <Table.Cell>{tramite.tramite.codigoTramite}</Table.Cell>
                <Table.Cell>{fechaFormateada}</Table.Cell>{" "}
                {/* Mostrar la fecha formateada */}
                <Table.Cell className="flex gap-2">
                  <button onClick={() => buscarTramite(tramite)}>
                    {tramite.escaneado != null ? (
                      <div className="flex gap-1 font-semibold text-primary ">
                        <span>Escaneado</span>
                        <FaFilePdf className=" size-5 text-primary" />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                  <button onClick={() => buscarTramite(tramite)}>
                    {tramite.protocolo != null ? (
                      <div className="flex gap-1 font-semibold text-primary ">
                        <span>Protocolo</span>
                        <FaFilePdf className=" size-5 text-primary" />
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                  <button onClick={() => descargarBalance(tramite.balance)}>
                    {tramite.balance != null ? (
                      <GrDocumentZip className=" size-5 text-primary" />
                    ) : (
                      ""
                    )}
                  </button>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>

      <Pagination
        className="text-center"
        currentPage={currentPage}
        totalPages={Math.ceil(tramites.length / itemsPerPage)}
        onPageChange={handlePageChange}
        previousLabel="Atras"
        nextLabel="Siguiente"
      />

      <Modal
        dismissible
        show={openModal}
        onClose={() => setOpenModal(false)}
        size="5xl"
      >
        <Modal.Header>Tramite Nro: {nroTramitePDF}</Modal.Header>
        <Modal.Body>
          <iframe
            src={pdfUrl}
            className="h-[1000px] w-full"
            title="Vista previa del PDF"
          ></iframe>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
}

export default ListaTramites;
