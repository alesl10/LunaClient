import ListDestinos from "../components/Lists/Destinos.jsx";
import Loading from "../components/Loading/Loading.jsx";
import { getDestinos } from "../api/Destinos.js";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const Destinos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    cargarDestinos();
  }, []);

  const cargarDestinos = async () => {
    setIsLoading(true);
    try {
      const response = await getDestinos();
      if (response.isSuccess == true) {
        setDestinos(response.data);
        setIsLoading(false);
      }
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message || "Hubo un problema con la conexión",
      });
      setIsLoading(false)
    }
  };

  return (
    <div className="bg-gray-200 h-full p-2 w-full flex flex-col gap-3 items-center">
      <h2 className="text-primary text-3xl font-bold">Consulta Destinos</h2>

      {isLoading ? <Loading /> : <ListDestinos destinos={destinos} />}
    </div>
  );
};

export default Destinos;
