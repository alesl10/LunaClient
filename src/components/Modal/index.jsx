import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { addUser } from "../../api/Usuario.js";
import { useEffect } from "react";

const ModalView = ({ openModal, setOpenModal, departamentos }) => {
  // config formulario
  const { register, handleSubmit, setValue } = useForm();

  function onCloseModal() {
    setOpenModal(false);
  }

  const onSubmit = handleSubmit(async (values) => {
    const response = await addUser(values);
    console.log(response);
  });

  return (
    <Modal show={openModal} size="md" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mx-auto flex flex-col"
        >
          <label>Nombre: </label>
          <input
            placeholder="nombre"
            type="text"
            {...register("nombre", {
              required: "El nombre de usuario es requerido",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>Apellido: </label>
          <input
            placeholder="apellido"
            type="text"
            {...register("apellido", {
              required: "El apellido de usuario es requerido",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>documento: </label>
          <input
            placeholder="Documento"
            type="text"
            {...register("Documento", {
              required: "El Documento de usuario es requerido",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>UserName: </label>
          <input
            placeholder="userName"
            type="text"
            {...register("userName", {
              required: "El userName de usuario es requerido",
            })}
            className="w-full py-2 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <label>Departamento:</label>
          <select {...register("idDpto")}>
            <option value=""></option>
            {departamentos.map((d, i) => (
              <option value={d.id} key={i}>
                {d.descripcion}
              </option>
            ))}
          </select>

          <button type="button" onClick={onSubmit} className="">
            Agregar usuario
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalView;
