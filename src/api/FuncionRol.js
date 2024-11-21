import axios from "./axios.js";

export const getFuncionesAssignedToRol = async (id) => {
  try {
    const response = await axios.get(
      `/FuncionRol/GetFuncionesAssignedToRol?idRol=${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getFuncionesNotAssignedToRol = async (id) => {
    try {
      const response = await axios.get(
        `/FuncionRol/GetFuncionesnotAssignedToRol?idRol=${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  
export const addRolFuncion = async (modelo) => {
  try {
    const response = await axios.post("/FuncionRol/addrolfuncion", modelo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
  
export const deleteRolFuncion = async (modelo) => {
  try {
    const response = await axios.post("/FuncionRol/deleterolfuncion", modelo);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
