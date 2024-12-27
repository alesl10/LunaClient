import { Table, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import DetalleModalView from "../Modals/detalleTramite.jsx";
import AsignarModalView from "../Modals/Asignacion.jsx";
import ListModalView from "../Modals/listModal.jsx";

const Bandeja = ({
  tramites = [],
  subDestinos = [],
  user,
  userOracle,
  cargarDatos,
}) => {
  // Configuración de paginación
  const [openDetalleModal, setOpenDetalleModal] = useState(false);
  const [openAsignacionModal, setOpenAsignacionModal] = useState(false);
  const [openListModal, setOpenListModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [tramite, setTramite] = useState();
  const [tramitesFiltrados, setTramitesFiltrados] = useState([]);
  const [tramitesOrdenados, setTramitesOrdenados] = useState([]);
  const [accion, setAccion] = useState();
  const [selectedTramites, setSelectedTramites] = useState([]);

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tramitesFiltrados.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const toggleTramite = (tramite) => {
    setSelectedTramites((prev) => {
      if (prev.includes(tramite)) {
        // Si ya está seleccionado, lo eliminamos
        return prev.filter(
          (item) => item.numerotramite !== tramite.numerotramite
        );
      } else {
        // Si no está seleccionado, lo agregamos
        return [...prev, tramite];
      }
    });
  };

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
      const estadoTramite =
        tramite.nombreUsuarioAsigando || tramite.nombreUsuarioRecepciona
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
  const recibirAsignarEnviar = (tramite, accion) => {
    setAccion(accion);
    setTramite(tramite);
    setOpenAsignacionModal(true);
  };

  // ABRIR MODAL LISTA
  const verListaRecibirEnviar = (accion) => {
    console.log(accion);
    setAccion(accion);
    setOpenListModal(true);
  };

  return (
    <div className="w-full  px-10">
      <DetalleModalView
        openDetalleModal={openDetalleModal}
        setOpenDetalleModal={setOpenDetalleModal}
        tramite={tramite}
      />
      <AsignarModalView
        openAsignacionModal={openAsignacionModal}
        setOpenAsignacionModal={setOpenAsignacionModal}
        tramite={tramite}
        accion={accion}
        subDestinos={subDestinos}
        user={user}
        userOracle={userOracle}
        cargarDatos={cargarDatos}
      />
      <ListModalView
        openListModal={openListModal}
        setOpenListModal={setOpenListModal}
        selectedTramites={selectedTramites}
        subDestinos={subDestinos}
        user={user}
        accion={accion}
        userOracle={userOracle}
        cargarDatos={cargarDatos}
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

      <div className="flex justify-end mb-2 gap-2 px-2">
        <button
          className=" px-2 py-1  bg-green-500 rounded-full text-white hover:saturate-200 hover:text-gray-700"
          onClick={() => verListaRecibirEnviar("recibir")}
        >
          Recibir
        </button>
        <button
          className=" px-2 py-1  bg-green-500 rounded-full text-white hover:saturate-200 hover:text-gray-700"
          onClick={() => verListaRecibirEnviar("enviar")}
        >
          Enviar
        </button>
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
                    <p>{tramite.fechaIngresoDestino}</p>
                    <span
                      className=" cursor-pointer text-red-500"
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
                    {tramite.nroSubdestino != 0 ? (
                      <div>
                        <span>Recibido por:</span>
                        <p className="font-bold text-primary">
                          {tramite.usuarioDestino != "9999"
                            ? ` ${tramite.nombreUsuarioRecepciona} [${tramite.usuarioDestino}]`
                            : "Sin Recibir"}
                        </p>
                        <span>Asignado a:</span>
                        <p className="font-bold text-primary">
                          {tramite.nombreUsuarioAsigando}
                        </p>
                      </div>
                    ) : (
                      <span className="font-bold text-primary">
                        {tramite.usuarioDestino != "9999"
                          ? `RECIBIDO POR : \n ${tramite.nombreUsuarioRecepciona} [${tramite.usuarioDestino}] `
                          : "SIN RECIBIR"}
                      </span>
                    )}
                  </div>
                </div>
              </Table.Cell>

              {/* columna 7 */}
              <Table.Cell >
                {tramite.usuarioDestino != "9999" ? (
                  <button
                    onClick={() => recibirAsignarEnviar(tramite, "enviar")}
                    className=" px-3 py-1   bg-[#6A9AB0] rounded-full text-gray-200 hover:saturate-150"
                  >
                    Enviar
                  </button>
                ) : (
                  <>
                    {tramite.nroSubdestino != 0 ? (
                      <button
                        onClick={() =>
                          recibirAsignarEnviar(tramite, "reAsignar")
                        }
                        className=" px-3 py-1   bg-[#6A9AB0] rounded-full text-gray-200 hover:saturate-150"
                      >
                        ReAsignar
                      </button>
                    ) : (
                      <button
                        onClick={() => recibirAsignarEnviar(tramite, "recibir")}
                        className=" px-2 py-1  bg-[#EAD8B1] rounded-full text-black hover:saturate-200 hover:text-gray-700"
                      >
                        Recibir/Asignar
                      </button>
                    )}
                  </>
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
                <input
                  type="checkbox"
                  checked={selectedTramites.includes(tramite)}
                  onChange={() => toggleTramite(tramite)}
                />
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
