import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const ModalView = ({
  openAsignacionModal,
  setOpenAsignacionModal,
  subDestinos = [],
  tramite,
}) => {
  const [agente, setAgente] = useState();
  // Configuración del formulario
  const { register, handleSubmit, reset } = useForm();

  // Cambiar agente asignado
  const handleAgenteChange = (e) => {
    setAgente(e.target.value);
    // console.log(e.target.value);
  };

  // Función para cerrar el modal
  const onCloseModal = () => {
    setOpenAsignacionModal(false);
  };

  const Asignar = () => {
    console.log(tramite);
    console.log(agente);
  };

  const onSubmit = handleSubmit(async (values) => {
    //   const response = await addFuncion(values);
    //   console.log(response);
    onCloseModal();
  });

  if (tramite != null)
    return (
      <Modal show={openAsignacionModal} size="2xl" onClose={onCloseModal} popup>
        <Modal.Header className="bg-primary   ">
            <span className="text-white font-bold">Detalles de Tramite a Asignar</span>
        </Modal.Header>
        <Modal.Body className="flex gap-2 items-center border-2 border-primary z-20 py-4 bg-secondary/20 font-medium">
          <span>
            Razon social: <br/>
            {tramite.razonSocial} {tramite.tipoSocietario}
          </span>
          <span>
            Correlativo: {tramite.correlativo} Tramite: {tramite.numerotramite}
          </span>
          {subDestinos.length > 0 ? (
            <select className=" p-0.5 px-1 border rounded-lg font-normal bg-gray-100  text-primary w-[150px] border-primary" onChange={handleAgenteChange}>
              <option>Agente</option>
              {subDestinos.map((agente, index) => (
                <option key={index}>({agente.nroSubdestino}) - {agente.nombreAgente}</option>
              ))}
            </select>
          ) : (
            <></>
          )}
          
          <button className=" px-3 py-1   bg-green-500 rounded-full text-gray-200 hover:saturate-150" onClick={() => Asignar()}>{subDestinos.length > 0 ? "Asignar" : "Recibir"}</button>
        </Modal.Body>
      </Modal>
    );
};

export default ModalView;
