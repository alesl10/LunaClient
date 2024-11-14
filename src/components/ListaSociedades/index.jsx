import { useState } from "react";
import { Table, Pagination } from "flowbite-react";
import { Link } from "react-router-dom";

function TablaSociedades({ sociedades }) {
  // configuracion paginacion
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sociedades.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full p-5">
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Correlativo</Table.HeadCell>
          <Table.HeadCell>Razon Social</Table.HeadCell>
          <Table.HeadCell>Referencial</Table.HeadCell>
          <Table.HeadCell>Tipo societario</Table.HeadCell>
          <Table.HeadCell>Cuil</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Ver Tramites</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems.map((sociedad, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {sociedad.correlativo}
              </Table.Cell>
              <Table.Cell>{sociedad.razonSocial}</Table.Cell>
              <Table.Cell>{sociedad.referencial}</Table.Cell>
              <Table.Cell>{sociedad.tipoSocietario}</Table.Cell>
              <Table.Cell>{sociedad.cuil}</Table.Cell>
              <Table.Cell>
                <button>
                  <Link to={`/busquedatramites/${sociedad.correlativo}`}>
                    Ver Tramites
                  </Link>
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination
        className="text-center"
        currentPage={currentPage}
        totalPages={Math.ceil(sociedades.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default TablaSociedades;
