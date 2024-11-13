import ListDestinos from "../components/ListDestinos/index.jsx";
import Loading from "../components/Loading/Loading.jsx";
import { getDestinos } from "../api/Destinos.js";
import { useState, useEffect } from "react";

const Destinos = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [destinos, setDestinos] = useState([]);

  useEffect(() => {
    cargarDestinos();
  }, []);

  const cargarDestinos = async () => {
    setIsLoading(true);
    const response = await getDestinos();
    if (response.isSuccess == true) {
      setDestinos(response.data);
      setIsLoading(false);
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
