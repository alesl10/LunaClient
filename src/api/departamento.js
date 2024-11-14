import axios from "./axios.js";

export const getDepartamentos = async () => {
  try {
    const response = await axios.get("/departamento");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
