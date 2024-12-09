import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

const ModalView = ({ openModal, setOpenModal, tramite }) => {
  // Configuración del formulario
  const { register, handleSubmit, reset } = useForm();

  // Función para cerrar el modal
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = handleSubmit(async (values) => {
    //   const response = await addFuncion(values);
    //   console.log(response);
    onCloseModal();
  });

  if (tramite != null)
    return (
      <Modal show={openModal} size="2xl" onClose={onCloseModal} popup>
        <Modal.Header className="bg-primary ">
          <h3 className="text-white font-bold ">Detalles de Tramite</h3>
        </Modal.Header>
        <Modal.Body className="flex flex-col gap-5 border-8 border-primary z-20 py-4 bg-secondary/20 font-medium">
          <div className="flex justify-center ">
            <img
              src="modificado.png"
              className="absolute opacity-30 flex w-[250px] h-[250px] object-contain z-0"
              alt="Detalles del trámite"
            />
          </div>

          {/* Detalles del tramite */}
          <div className="flex flex-col items-center justify-end">
            <h4 className="text-2xl text-primary font-semibold">
              Razon Social:
            </h4>
            <span className="text-3xl font-semibold text-center">
              {tramite.razonSocial} {tramite.tipoSocietario}
            </span>
          </div>

          <div className="flex justify-around">
            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Correlativo:
              </h4>
              <span className="font-semibold text-lg">
                {" "}
                {tramite.correlativo}
              </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Tramite Nº:
              </h4>
              <span className="font-semibold text-lg">
                {" "}
                {tramite.numerotramite}
              </span>
            </div>
          </div>

          <div >
            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Tipo Societario:
              </h4>
              <span> {tramite.tipoSocietario} </span>
              <span>- {tramite.codigoSocietario} </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Tipo Tramite:
              </h4>
              <span> {tramite.descripcionTramite} </span>
              <span> {tramite.codigoTramite} </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Destino Anterior:
              </h4>
              <span> {tramite.destinoAnteriordDpto} </span>
              <span> {tramite.destinoAnteriordArea} </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Destino Actual:
              </h4>
              <span> {tramite.departamentoDestinoActual} </span>
              <span> {tramite.areaDestinoActual} </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Ingreso Destino Actual:
              </h4>
              <span>
                {" "}
                {tramite.fechaIngresoDestino
                  ? format(new Date(tramite.fechaIngresoDestino), "dd/MM/yyyy")
                  : "Fecha no válida"}{" "}
              </span>
            </div>

            <div className="flex flex-col  justify-end">
              <h4 className="text-xl text-primary font-semibold">
                Usuario Actual:
              </h4>
              <span> {tramite.nombreUsuarioRecepciona} </span>
              <span> {tramite.areaDestinoActual} </span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
};

export default ModalView;
