import axios from "./axios.js";

export const getUserDbByName = async (usuario) => {
  try {
    const response = await axios.get(
      `/Usuario/GetUserDbUserByName?name=${usuario}`
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener los datos del usuario", error);
    throw error;
  }
};
