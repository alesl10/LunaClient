import axios from "./axios.js";

export const getFunciones = async () => {
  try {
    const response = await axios.get("/funcion/getallfunciones");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addFuncion = async (funcion) => {
  try {
    const response = await axios.post("/funcion/addfuncion", funcion);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateFuncion = async (funcion) => {
  try {
    const response = await axios.post("/funcion/updatefuncion", funcion);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
