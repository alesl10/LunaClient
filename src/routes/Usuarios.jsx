import Loading from "../components/Loading/Loading.jsx";
import { getUsers } from "../api/Usuario.js";
import { useState, useEffect } from "react";
import ListUsuarios from "../components/ListUsuarios/index.jsx";

const Destinos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    setIsLoading(true);
    const response = await getUsers();
    if (response.isSuccess == true) {
        setUsuarios(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full p-2 w-full flex flex-col gap-3 items-center">
      <h2 className="text-primary text-3xl font-bold">Consulta Usuarios</h2>

      {isLoading ? <Loading /> : <ListUsuarios usuarios={usuarios} />}
    </div>
  );
};

export default Destinos;
