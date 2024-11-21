import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Pagination } from "flowbite-react";
import ModalView from "../Modals/Usuarios.jsx";
import { getDepartamentos } from "../../api/Departamento.js";

const ListUsuarios = ({ usuarios }) => {
  const [openModal, setOpenModal] = useState(false);
  const [departamentos, setDepartamentos] = useState([]);
  const [user, setUser] = useState(null); // Asegúrate de que el estado sea null al principio
  const [isEditMode, setIsEditMode] = useState(false); // Flag para saber si estamos en modo edición

  const getDptos = async () => {
    const response = await getDepartamentos();
    setDepartamentos(response.data);
  };

  const editUser = (usuario) => {
    setUser(usuario);
    setIsEditMode(true); // Activamos el modo de edición
    setOpenModal(true); // Abrimos el modal
  };

  const addUser = () => {
    setUser(null); // Aseguramos que `user` esté vacío cuando agreguemos un nuevo usuario
    setIsEditMode(false); // Desactivamos el modo de edición
    setOpenModal(true); // Abrimos el modal
  };

  useEffect(() => {
    getDptos();
  }, []);

  // Estado para el filtro de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Filtrar los trámites según el término de búsqueda (nombre o código)
  const filteredItems = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="w-2/3 flex flex-col ">
      <ModalView
        openModal={openModal}
        setOpenModal={setOpenModal}
        departamentos={departamentos}
        user={user}
        setUser={setUser}
        isEditMode={isEditMode} 
      />
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
          onClick={addUser} // Llamamos a la función para agregar un nuevo usuario
        >
          Agregar Usuario
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2  font-semibold bg-red-800 text-white rounded-md hover:saturate-50 "
        >
          Volver
        </button>
      </div>
      {/* Tabla con la lista de trámites */}
      <Table striped>
        <Table.Head>
          <Table.HeadCell>Nombre</Table.HeadCell>
          <Table.HeadCell>Apellido</Table.HeadCell>
          <Table.HeadCell>Documento</Table.HeadCell>
          <Table.HeadCell>UserName</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {currentItems.map((u, i) => (
            <Table.Row
              key={i}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {u.nombre}
              </Table.Cell>
              <Table.Cell>{u.apellido}</Table.Cell>
              <Table.Cell>{u.documento}</Table.Cell>
              <Table.Cell>{u.userName}</Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => editUser(u)} // Editamos el usuario
                  className="bg-blue-500 px-4 py-2 rounded-xl text-white hover:saturate-50 m-2 "
                >
                  Editar
                </button>
                <button className="bg-red-700 px-4 py-2 rounded-xl text-white hover:saturate-50 m-2 ">
                  Eliminar
                </button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Pagination
        className="text-center"
        currentPage={currentPage}
        totalPages={Math.ceil(usuarios.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ListUsuarios;
