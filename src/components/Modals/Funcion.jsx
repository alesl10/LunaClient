import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { addFuncion } from "../../api/Funcion.js";
import { useEffect, useState } from "react";

const ModalView = ({
  openModal,
  setOpenModal,
}) => {
  // Configuración del formulario
  const { register, handleSubmit, reset } = useForm();
  
  // Función para cerrar el modal
  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onSubmit = handleSubmit(async (values) => {
      const response = await addFuncion(values);
      console.log(response);
    onCloseModal();
  });

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto flex flex-col"
        >
          <label>Nombre: </label>
          <input
            placeholder="nombre"
            type="text"
            {...register("nombre", {
              required: "El nombre de la funcion es requerido",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>Url: </label>
          <input
            placeholder="url"
            type="text"
            {...register("url", {
              required: "La url es requerida",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
           Agregar
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalView;
