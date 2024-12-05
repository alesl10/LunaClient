import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

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
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header>Detalles de Tramite</Modal.Header>
        <Modal.Body>
          <span> {tramite.razonSocial}</span>
          <span> {tramite.tipoSocietario} </span>
          <span> {tramite.codigoSocietario} </span>
          <span> {tramite.descripcionTramite} </span>
          <span> {tramite.urgenteNormal} </span>
          <span> {tramite.registralInfoContable} </span>
          <span> {tramite.destinoAnteriordDpto} </span>
          <span> {tramite.destinoAnteriordArea} </span>
          <span> {tramite.areaDestinoActual} </span>
          <span> {tramite.departamentoDestinoActual} </span>
          <span> {tramite.nombreUsuarioRecepciona} </span>
          <span> {tramite.userRecepciona} </span>
          <span> {tramite.nombreUsuarioAsigando} </span>
          <span> {tramite.userUsuarioAsignado} </span>
          <span> {tramite.correlativo} </span>
          <span> {tramite.codigoTramite} </span>
          <span> {tramite.fechaComienzoTramite} </span>
          <span> {tramite.numerotramite} </span>
          <span> {tramite.codigoDestino} </span>
          <span> {tramite.usuarioDestino} </span>
          <span> {tramite.fechaIngresoDestino} </span>
          <span> {tramite.fechaSalidaDestino} </span>
          <span> {tramite.destinoAnterior} </span>
          <span> {tramite.nroSubdestino} </span>
        </Modal.Body>
      </Modal>
    );
};

export default ModalView;
