import { Modal } from "flowbite-react";
import { addRolFuncion, deleteRolFuncion} from '../../api/FuncionRol.js'

const ModalViewRol = ({
  openModal,
  setOpenModal,
  rolId,
  funcionesAsignadas,
  funcionesNoAsignadas,
  setFuncionesNoAsignadas,
  setFuncionesAsignadas
}) => {
  function onCloseModal() {
    setOpenModal(false);
  }

  const AddRol = async (idFuncion) => {
    const modelo = {
      rolid: rolId,
      funid: idFuncion,
    };
    await addRolFuncion(modelo);
    const funcionAgregada = funcionesNoAsignadas.find(f => f.id === idFuncion);
    
    // Actualizamos las listas en el estado
    setFuncionesAsignadas([...funcionesAsignadas, funcionAgregada]);
    setFuncionesNoAsignadas(funcionesNoAsignadas.filter(f => f.id !== idFuncion));
  };

  const DeleteRol = async (idFuncion) => {
    const modelo = {
      rolid: rolId,
      funid: idFuncion,
    };
    await deleteRolFuncion(modelo);
    const funcionEliminada = funcionesAsignadas.find(f => f.id === idFuncion);

    // Actualizamos las listas en el estado
    setFuncionesAsignadas(funcionesAsignadas.filter(f => f.id !== idFuncion));
    setFuncionesNoAsignadas([...funcionesNoAsignadas, funcionEliminada]);
  };

  return (
    <Modal show={openModal} size="3xl" onClose={onCloseModal} popup>
      <Modal.Header />
      <Modal.Body>
        <h5 className=" font-bold text-primary text-xl">Funciones asignadas</h5>
        <ul>
          {funcionesAsignadas.map((f, i) => (
            <div
              key={i}
              className="flex justify-between items-center space-y-2"
            >
              <li>{f.nombre}</li>

              <button
                onClick={() => DeleteRol(f.id)}
                className="px-3 py-1 bg-red-800 rounded-xl text-gray-100 font-semibold"
              >
                Eliminar
              </button>
            </div>
          ))}
        </ul>
        <h5 className=" font-bold text-primary text-xl">
          Funciones No asignadas
        </h5>
        <ul>
          {funcionesNoAsignadas.map((f, i) => (
            <div
              key={i}
              className="flex justify-between items-center space-y-2"
            >
              <li>{f.nombre}</li>

              <button
                onClick={() => AddRol(f.id)}
                className="px-3 py-1 bg-green-800 rounded-xl text-gray-100 font-semibold"
              >
                Agregar
              </button>
            </div>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export default ModalViewRol;
