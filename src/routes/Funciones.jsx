import Loading from "../components/Loading/Loading.jsx";
import { useState, useEffect } from "react";
import {getFunciones, } from '../api/Funcion.js'
import ListFunciones from "../components/Lists/Funciones.jsx"

const Funciones = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [funciones, setFunciones] = useState([]);

  useEffect(() => {
    cargarFunciones();
  }, []);

  const cargarFunciones = async () => {
    setIsLoading(true);
    const response = await getFunciones();
    if (response.isSuccess == true) {
        setFunciones(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full p-2 w-full flex flex-col gap-3 items-center">
      <h2 className="text-primary text-3xl font-bold">Consulta Funciones</h2>

      {isLoading ? <Loading /> : <ListFunciones funciones={funciones} />}
    </div>
  );
};

export default Funciones;
