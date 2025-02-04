import axios from "./axios.js";

export const login = async (nombre, contraseña) => {
  try {
    const response = await axios.get(
      `/Usuario/ValidarCredencialUsuarioActiveDirectory?nombre=${nombre}&password=${contraseña}`
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loginUserOracle = async (username) => {
  try {
    const response = await axios.get(
      `/userDestino/getuserDestinos?username=${username}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
