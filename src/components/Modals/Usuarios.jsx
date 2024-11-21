import { Modal } from "flowbite-react";
import { useForm } from "react-hook-form";
import { addUser, editUser } from "../../api/Usuario.js";
import { useEffect, useState } from "react";

const ModalView = ({
  openModal,
  setOpenModal,
  departamentos,
  setUser,
  user = {},
  isEditMode,
}) => {
  // Configuración del formulario
  const { register, handleSubmit, reset } = useForm();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isEditMode && user && Object.keys(user).length) {
      reset({
        nombre: user.nombre || "",
        apellido: user.apellido || "",
        Documento: user.documento || "",
        userName: user.userName || "",
        idDpto: user.idDpto || "",
      });
    } else {
      reset({
        nombre: "",
        apellido: "",
        Documento: "",
        userName: "",
        idDpto: "",
      });
    }
  }, [user, isEditMode, reset]);

  // Función para cerrar el modal
  const onCloseModal = () => {
    setUser(null);
    setOpenModal(false);
  };

  const onSubmit = handleSubmit(async (values) => {
    if (isEditMode) {
      const updateUser = {
        ...user,
        ...values,
      };
      const response = await editUser(updateUser);
      console.log(response);
    } else {
      const response = await addUser(values);
      console.log(response);
    }
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

          <label>Documento: </label>
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
            <option value="">Seleccione un departamento</option>
            {departamentos.map((d, i) => (
              <option value={d.id} key={i}>
                {d.descripcion}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            {isEditMode ? "Actualizar" : "Agregar"}{" "}
            {/* Cambiar el texto según el modo */}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalView;
