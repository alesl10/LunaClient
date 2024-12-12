import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import DetalleModalView from "../Modals/detalleTramite.jsx";
import AsignarModalView from "../Modals/Asignacion.jsx";
import { TbUrgent } from "react-icons/tb";

const Bandeja = ({ tramites = [], subDestinos = [] }) => {
  // Configuración de paginación
  const [openDetalleModal, setOpenDetalleModal] = useState(false);
  const [openAsignacionModal, setOpenAsignacionModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tramite, setTramite] = useState();
  const [agente, setAgente] = useState();
  // const [viewBotonModal, setViewBotonModal] = useState(false);
  const [tramitesFiltrados, setTramitesFiltrados] = useState([]);
  const [tramitesOrdenados, setTramitesOrdenados] = useState([]);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tramitesFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Inicio logica de filtrado
  const [filters, setFilters] = useState({
    numeroTramite: "",
    demanda: "",
    tipo: "",
    estado: "",
    correlativo: "",
    estado: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  useEffect(() => {
    const filtered = tramitesOrdenados.filter((tramite) => {
      const estadoTramite = tramite.nombreUsuarioAsigando || tramite.nombreUsuarioRecepciona
        ? "Asignado/Recibido"
        : "Sin recibir";

      return (
        (filters.numeroTramite === "" ||
          tramite.numerotramite.toString().includes(filters.numeroTramite)) &&
        (filters.tipo === "" ||
          tramite.registralInfoContable === filters.tipo) &&
        (filters.correlativo === "" ||
          tramite.correlativo?.toString().includes(filters.correlativo)) &&
        (filters.demanda === "" || tramite.urgenteNormal === filters.demanda) &&
        (filters.estado === "" || estadoTramite === filters.estado)
      );
    });
    setTramitesFiltrados(filtered);
    handlePageChange(1);
  }, [filters, tramitesOrdenados]);

  // Tramites ordenados
  useEffect(() => {
    setTramitesOrdenados(
      tramites.sort((a, b) =>
        b.fechaIngresoDestino.localeCompare(a.fechaIngresoDestino)
      )
    );
  }, [tramites]);

  // Para abrir modal detalle
  const verDetalles = (tramite) => {
    setTramite(tramite);
    setOpenDetalleModal(true);
  };

  // Para abrir modal asignacion
  const verAsignacion = (tramite) => {
    setTramite(tramite);
    setOpenAsignacionModal(true);
  };

  const handleDestinoChange = (e) => {
    setDestino(e.target.value);
    // setSelectedDestino({ codigoDestino: e.target.value });
  };

  return (
    <div className="w-full  px-10">
      {/* <div className={`fixed bottom-10 right-20 flex  gap-2 z-20 ${viewBotonModal ? "" : "hidden"}`}>
        <button className=" px-3 py-1 mt-1 m-auto  bg-[#6A9AB0] text-white rounded-full border-2 border-primary  hover:saturate-150">Asignar todos</button>
        <button className=" px-3 py-1 mt-1 m-auto  bg-secondary text-primary rounded-full border-2 border-primary  hover:saturate-150">Recibir todos</button>
      </div> */}

      <DetalleModalView
        openDetalleModal={openDetalleModal}
        setOpenDetalleModal={setOpenDetalleModal}
        tramite={tramite}
      />
      <AsignarModalView
        openAsignacionModal={openAsignacionModal}
        setOpenAsignacionModal={setOpenAsignacionModal}
        tramite={tramite}
        subDestinos={subDestinos}
      />
      {/* Filtros */}
      <div className="mb-2 flex justify-center">
        <div className="mb-4 gap-4 flex">
          <input
            type="text"
            name="numeroTramite"
            placeholder="N° de trámite"
            value={filters.numeroTramite}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1"
          />
          <input
            type="text"
            name="correlativo"
            placeholder="Correlativo"
            value={filters.correlativo}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1"
          />
          <select
            name="demanda"
            value={filters.demanda}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">Urgente/Comun</option>
            <option value="U">Urgente</option>
            <option value="N">Comun</option>
          </select>
          <select
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">Todos los tipos</option>
            <option value="R">Registral</option>
            <option value="C">Contable</option>
            <option value="I">Informativo</option>
          </select>
          <select
            name="estado"
            value={filters.estado}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">Todos los estados</option>
            <option value="Asignado/Recibido">Asignado/Recibido</option>
            <option value="Sin recibir">Sin recibir</option>
          </select>
        </div>
      </div>

      {/* Tabla con la lista de trámites */}
      <Table>
        <Table.Head className="text-primary">
          <Table.HeadCell className="bg-secondary">
            n° de tramite
          </Table.HeadCell>
          <Table.HeadCell className="bg-secondary">Tramite</Table.HeadCell>
          <Table.HeadCell className="bg-secondary">entidad</Table.HeadCell>
          <Table.HeadCell className="bg-secondary">tipo</Table.HeadCell>
          <Table.HeadCell className="bg-secondary">
            Destino <br />
            Actual/Anterior
          </Table.HeadCell>
          <Table.HeadCell className="bg-secondary">estado</Table.HeadCell>
          <Table.HeadCell className="bg-secondary">accion</Table.HeadCell>
          <Table.HeadCell className="bg-secondary">Urgente</Table.HeadCell>
          <Table.HeadCell className="bg-secondary"></Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {currentItems.map((tramite, i) => (
            <Table.Row
              key={i}
              className={`dark:border-gray-700 dark:bg-gray-800 border-l-8    bg-white ${
                tramite.registralInfoContable == "R"
                  ? "border-blue-500"
                  : tramite.registralInfoContable == "C"
                  ? "border-yellow-400"
                  : tramite.registralInfoContable == "I"
                  ? "border-green-400"
                  : " border-[#ff93ff]"
              } `}
            >
              {/* columna 1 */}
              <Table.Cell
                className={`font-medium items-end gap-2 dark:text-white `}
              >
                <div className="flex gap-2">
                  <div className="flex flex-col ">
                    <p className="text-base font-semibold text-primary">
                      {tramite.numerotramite}
                    </p>
                    <p>
                      {tramite.fechaIngresoDestino
                        ? format(
                            new Date(tramite.fechaIngresoDestino),
                            "dd/MM/yyyy"
                          )
                        : "Fecha no válida"}
                    </p>
                    <span
                      className=" cursor-pointer"
                      onClick={() => verDetalles(tramite)}
                    >
                      Ver Detalles
                    </span>
                  </div>
                </div>
              </Table.Cell>
              {/* columna  2*/}
              <Table.Cell>
                <div className="flex items-center justify-start gap-3 ">
                  <div className="flex flex-col ">
                    <h4 className="text-md flex gap-2 font-semibold text-primary">
                      {tramite.descripcionTramite} - {tramite.codigoTramite}
                    </h4>
                    <span>{tramite.areaDestinoActual}</span>
                    <span>{tramite.departamentoDestinoActual}</span>
                  </div>
                </div>
              </Table.Cell>

              {/* columna 3*/}
              <Table.Cell>
                <div className="flex items-center justify-start gap-3 ">
                  <div className="flex flex-col ">
                    <span>{tramite.correlativo}</span>
                    <span className="text-primary font-semibold">
                      {tramite.razonSocial}
                    </span>
                    <span>{tramite.tipoSocietario}</span>
                  </div>
                </div>
              </Table.Cell>
              {/* Columna 4 */}
              <Table.Cell>
                <p className="text-md">
                  {tramite.registralInfoContable == "R"
                    ? "Registral"
                    : tramite.registralInfoContable == "C"
                    ? "Contable"
                    : tramite.registralInfoContable == "I"
                    ? "Informativo"
                    : ""}
                </p>
              </Table.Cell>

              {/* columna 5 */}
              <Table.Cell>
                <p className="text-base text-center">
                  {tramite.codigoDestino} / {tramite.destinoAnterior}
                </p>
              </Table.Cell>

              {/* Columna 6 */}
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col ">
                    {tramite.nombreUsuarioAsigando ? (
                      <div>
                        <span>Recibido por:</span>
                        <p className="font-bold text-primary">
                          {tramite.nombreUsuarioRecepciona
                            ? tramite.nombreUsuarioRecepciona
                            : "Sin Recibir"}
                        </p>
                        <span>Asignado a:</span>
                        <p className="font-bold text-primary">
                          {tramite.nombreUsuarioAsigando}
                        </p>
                      </div>
                    ) : (
                      <span className="font-bold text-primary">
                        {tramite.nombreUsuarioRecepciona
                          ? `RECIBIDO POR : \n ${tramite.nombreUsuarioRecepciona}`
                          : "SIN RECIBIR"}
                      </span>
                    )}
                  </div>
                </div>
              </Table.Cell>

              {/* columna 7 */}
              <Table.Cell>
                {/* cambiar por funcion para enviar y recibir  */}
                {tramite.nombreUsuarioAsigando ? (
                  <button
                    onClick={() => verAsignacion(tramite)}
                    className=" px-3 py-1   bg-[#6A9AB0] rounded-full text-gray-200 hover:saturate-150"
                  >
                    ReAsignar
                  </button>
                ) : (
                  <button
                    onClick={() => verAsignacion(tramite)}
                    className=" px-2 py-1  bg-[#EAD8B1] rounded-full text-black hover:saturate-200 hover:text-gray-700"
                  >
                    Recibir/Asignar
                  </button>
                )}
              </Table.Cell>
              <Table.Cell>
                {tramite.urgenteNormal == "U" ? (
                  <img src="/icons/urgente.png" className="size-10" />
                ) : (
                  ""
                )}
              </Table.Cell>
              <Table.Cell className=" bg-transparent">
                <input type="checkbox" />
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
