import { Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { RecibirAsignar } from "../../api/Tramite.js";
import { getDestinos } from "../../api/Destinos.js";

const ModalView = ({
  openAsignacionModal,
  setOpenAsignacionModal,
  subDestinos = [],
  tramite,
  accion,
  userOracle,
  cargarDatos,
}) => {
  const [agente, setAgente] = useState();
  const [destinoHacia, setDestinoHacia] = useState();
  const [destinos, setDestinos] = useState([]);

  const Enviar = async () => {
    const promesas = selectedTramites.map(async (tramite) => {
      const modelo = {
        Destino: tramite.codigoDestino,
        Correlativo: tramite.correlativo,
        CodigoTramite: tramite.codigoTramite,
        FechaComienzoTramite: tramite.fechaComienzoTramite,
        Numerotramite: tramite.numerotramite,
        CodigoDestino: tramite.codigoDestino,
        DestinoHacia: destinoHacia.toUpperCase(),
      };

      const response = await EnviarTramite(modelo);
      // console.log(response);
    });

    // Espera a que todas las promesas se resuelvan
    await Promise.all(promesas);

    // Ejecuta las acciones posteriores
    setDestinoHacia();
    cargarDatos();
  };

  useEffect(() => {
    cargarDestinos();
  }, []);

  //CARGAR DESTINOS PARA ENVIO
  const cargarDestinos = async () => {
    try {
      const response = await getDestinos();
      if (response.isSuccess == true) {
        setDestinos(response.data);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Hubo un problema con la conexión",
      });
    }
  };

  // Configuración del formulario
  const { register, handleSubmit, reset } = useForm();

  // Cambiar agente asignado
  const handleAgenteChange = (e) => {
    setAgente(parseInt(e.target.value));
    console.log(e.target.value);
  };

  // Función para cerrar el modal
  const onCloseModal = () => {
    setOpenAsignacionModal(false);
  };

  const Asignar = async () => {
 
    const modelo = {
      Correlativo: tramite.correlativo,
      Numerotramite: tramite.numerotramite,
      CodigoDestino: tramite.codigoDestino,
      UsuarioDestino: userOracle[0].codigoUsuario,
      nroSubdestino: agente ? agente : null,
    };

    const response = await RecibirAsignar(modelo);
    // console.log(modelo);
    cargarDatos();
  };

  const onSubmit = handleSubmit(async (values) => {
    //   const response = await addFuncion(values);
    //   console.log(response);
    onCloseModal();
  });

  if (tramite != null)
    return (
      <Modal show={openAsignacionModal} size="4xl" onClose={onCloseModal} popup>
        <Modal.Header className="bg-primary   ">
          <span className="text-white font-bold">
            Detalles de Tramite a Asignar
          </span>
        </Modal.Header>
        <Modal.Body className="flex gap-2 justify-between border-2 border-primary z-20 py-4 bg-secondary/20 font-medium">
          <p className="flex gap-2">
            <strong className="text-blue-950">Razon social: </strong>
            {tramite.razonSocial} {tramite.tipoSocietario}
            <strong className="text-blue-950"> Correlativo: </strong>
            {tramite.correlativo}{" "}
            <strong className="text-blue-950"> Tramite: </strong>
            {tramite.numerotramite}
          </p>

          {accion == "enviar" ? (
            <>
              <div className="flex gap-2">
                <select
                  className="rounded-md text-sm p-1.5"
                  onChange={(e) => setDestinoHacia(e.target.value)}
                >
                  <option>Enviar a </option>
                  {destinos.map((destino, index) => (
                    <option key={index} value={destino.codigo}>
                      {destino.codigo}
                    </option>
                  ))}
                </select>
                <button
                  className="px-2 py-1 bg-green-600 rounded-xl border-white border-2 text-white hover:saturate-150"
                  onClick={() => Enviar()}
                >
                  Confirmar
                </button>
              </div>
            </>
          ) : (
            <>
              {subDestinos.length > 0 ? (
                <select
                  className=" p-0.5 px-1 border rounded-lg font-normal bg-gray-100  text-primary w-[150px] border-primary"
                  onChange={handleAgenteChange}
                >
                  <option>Agente</option>
                  {subDestinos.map((agente, index) => (
                    <option key={index} value={agente.nroSubdestino}>
                      ({agente.nroSubdestino}) - {agente.nombreAgente}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}

              <button
                className="px-2 py-1 bg-green-600 rounded-xl border-white border-2 text-white hover:saturate-150"
                onClick={() => Asignar()}
              >
                {subDestinos.length > 0 ? "Asignar" : "Recibir"}
              </button>
            </>
          )}
        </Modal.Body>
      </Modal>
    );
};

export default ModalView;
