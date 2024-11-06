import axios from "./axios.js";

export const login = (nombre, contraseña) =>
  axios.get(`/Usuario/ValidarCredencialUsuarioActiveDirectory?nombre=${nombre}&password=${contraseña}`);
