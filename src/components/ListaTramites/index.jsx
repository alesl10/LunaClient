import { getPdfBinario } from "../../api/Archivo.js";
import { Table, Pagination, Modal, ModalFooter } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns"; // Importar date-fns para formatear la fecha

function ListaTramites({ tramites, setPdfUrl, pdfUrl }) {
  const [openModal, setOpenModal] = useState(false);

  // Configuración de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tramites.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Función para buscar el PDF del trámite
  const buscarTramite = async (tramitepdf) => {
    const response = await getPdfBinario(tramitepdf);
    const base64Data = response.data;
    const pdfBlob = base64ToBlob(base64Data);
    const url = URL.createObjectURL(pdfBlob);
    setPdfUrl(url);
    setOpenModal(true);
  };

  // Convertir base64 a Blob
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

  return (
    <div className="w-2/3">
      {/* Tabla con la lista de trámites */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Correlativo</Table.HeadCell>
          <Table.HeadCell>Nro. Tramite</Table.HeadCell>
          <Table.HeadCell>Código Tramite</Table.HeadCell>
          <Table.HeadCell>Tipo Tramite</Table.HeadCell>
          <Table.HeadCell>Fecha Registración</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Acción</span>
          </Table.HeadCell>
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
                  {tramite.tramite.correlativo}
                </Table.Cell>
                <Table.Cell>{tramite.tramite.nroTramite}</Table.Cell>
                <Table.Cell>{tramite.tramite.codigoTramite}</Table.Cell>
                <Table.Cell>{tramite.tramite.tipoTramite}</Table.Cell>
                <Table.Cell>{fechaFormateada}</Table.Cell>{" "}
                {/* Mostrar la fecha formateada */}
                <Table.Cell>
                  <button onClick={() => buscarTramite(tramite)}>
                    {tramite.escaneado != null || tramite.protocolo != null
                      ? "Ver PDF"
                      : ""}
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
      />

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size="5xl">
        <Modal.Header>Terms of Service</Modal.Header>
        <Modal.Body >
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
