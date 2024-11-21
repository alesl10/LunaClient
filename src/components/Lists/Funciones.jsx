import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from "flowbite-react";


const ListFunciones = ({ funciones }) => {
  const [openModal, setOpenModal] = useState(false);

  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtrar los trámites según el término de búsqueda (nombre o código)
  const filteredItems = funciones.filter((funcion) =>
  funcion.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
    <div className="w-full px-4 flex flex-col ">
      {/* <ModalViewRol
        openModal={openModal}
        setOpenModal={setOpenModal}
        rolId={rolId}
        funcionesAsignadas={funcionesAsignadas}
        funcionesNoAsignadas={funcionesNoAsignadas}
        setFuncionesAsignadas={setFuncionesAsignadas}
        setFuncionesNoAsignadas={setFuncionesNoAsignadas}
      /> */}
      <div className="border-2 flex gap-2 justify-around rounded-lg mb-2 items-center">
        {/* Input de búsqueda */}
        <input
          type="text"
          placeholder="Buscar por nombre"
          className="grow  border border-gray-300 rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="px-4 py-2  font-semibold bg-green-700 text-white rounded-md hover:saturate-50"
          onClick={() => setOpenModal(true)}
        >
          Agregar Funcion
        </button>
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
          <Table.HeadCell>Nombre</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {currentItems.map((f, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {f.nombre}
              </Table.Cell>
             
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination
        className="text-center"
        currentPage={currentPage}
        totalPages={Math.ceil(funciones.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListFunciones;
