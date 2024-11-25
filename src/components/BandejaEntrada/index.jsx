import { Table, Pagination } from "flowbite-react";
import { useState } from "react";

const Bandeja = ({ tramites = [] }) => {
  // Configuración de paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tramites.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-5">
      {/* Tabla con la lista de trámites */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell>Correlativo</Table.HeadCell>
          <Table.HeadCell>Codigo Tramite</Table.HeadCell>
          <Table.HeadCell>N° Tramite</Table.HeadCell>
          <Table.HeadCell>Usuario destino</Table.HeadCell>
          <Table.HeadCell>Destino anterior</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems.map((tramite, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <input type="checkbox" />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {tramite.correlativo}
              </Table.Cell>
              <Table.Cell>{tramite.codigoTramite}</Table.Cell>
              <Table.Cell>{tramite.numerotramite}</Table.Cell>
              <Table.Cell>{tramite.usuarioDestino}</Table.Cell>
              <Table.Cell>{tramite.destinoAnterior}</Table.Cell>
              <Table.Cell className="flex gap-2">
                {/* cambiar por funcion para enviar y recibir  */}
                <button onClick={()=> console.log(`recibir correlativo ${tramite.correlativo}, tramite ${tramite.numerotramite}`)}  className=" px-3 py-1 bg-green-800 rounded-full text-gray-200">
                  Recibir
                </button>
                <button onClick={()=> console.log(`enviar correlativo ${tramite.correlativo}, tramite ${tramite.numerotramite}`)} className=" px-3 py-1 bg-blue-800 rounded-full text-gray-200">
                  Enviar
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
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
    </div>
  );
};

export default Bandeja;
