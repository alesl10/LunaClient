import axios from "./axios.js";

export const login = async (nombre, contraseña) =>{
  try {
    const response = await axios.get(`/Usuario/ValidarCredencialUsuarioActiveDirectory?nombre=${nombre}&password=${contraseña}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
