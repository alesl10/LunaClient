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

export const getUsers = async () => {
  try {
    const response = await axios.get("/usuario/usersdb");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addUser = async (usuario) => {
  try {
    const response = await axios.post("/usuario/adduser", usuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const editUser = async (usuario) => {
  try {
    const response = await axios.post("/usuario/edituser", usuario);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
