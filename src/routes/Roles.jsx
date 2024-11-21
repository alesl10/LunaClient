import Loading from "../components/Loading/Loading.jsx";
import { getAllRoles } from "../api/rol.js";
import { useState, useEffect } from "react";
import ListRoles from "../components/Lists/Roles.jsx";

const Roles = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    cargarRoles();
  }, []);

  const cargarRoles = async () => {
    setIsLoading(true);
    const response = await getAllRoles();
    if (response.isSuccess == true) {
      setRoles(response.data);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 h-full p-2 w-full flex flex-col gap-3 items-center">
      <h2 className="text-primary text-3xl font-bold">Consulta Roles</h2>

      {isLoading ? <Loading /> : <ListRoles roles={roles} />}
    </div>
  );
};

export default Roles;
