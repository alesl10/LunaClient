import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from "flowbite-react";

const ListDestinos = ({ destinos }) => {
  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtrar los trámites según el término de búsqueda (nombre o código)
  const filteredItems = destinos.filter(
    (destino) =>
      destino.departamento.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generatePDF = async () => {
    try {
      const response = await generatePDFTipoTramite(filteredItems);

      const url = URL.createObjectURL(response.data);

      // Crear un enlace temporal para descargar el archivo PDF
      const a = document.createElement("a");
      a.href = url;
      a.download = "TipoTramite.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libera la URL del Blob
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  const generateExcel = async () => {
    try {
      const response = await generateExcelTipoTramite(filteredItems);

      const url = URL.createObjectURL(response.data);

      // Crear un enlace temporal para descargar el archivo PDF
      const a = document.createElement("a");
      a.href = url;
      a.download = "TipoTramite.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Libera la URL del Blob
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error al generar el Excel", error);
    }
  };

  // Configuración de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-2/3 flex flex-col ">
      <div className="border-2 flex gap-2 justify-around rounded-lg mb-2 items-center">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="w-full  border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2  font-semibold bg-red-800 text-white rounded-md hover:saturate-50 "
        >
          volver
        </button>
      </div>
      {/* Tabla con la lista de trámites */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Código</Table.HeadCell>
          <Table.HeadCell>Departamento</Table.HeadCell>
          <Table.HeadCell>Area</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {currentItems.map((d, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {d.codigo}
              </Table.Cell>
              <Table.Cell>{d.departamento}</Table.Cell>
              <Table.Cell>{d.area}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <div className="w-full flex justify-center">
        <button
          className="bg-blue-500 px-4 py-2 rounded-xl text-white hover:saturate-50 m-2 "
          onClick={generatePDF}
        >
          Generar PDF
        </button>
        <button
          className="bg-green-500 px-4 py-2 rounded-xl text-white hover:saturate-50 m-2 "
          onClick={generateExcel}
        >
          Generar Excel
        </button>
      </div>

      <Pagination
        className="text-center"
        currentPage={currentPage}
        totalPages={Math.ceil(destinos.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListDestinos;
