import axios from "./axios.js";

export const getTipoSocietarios = async () => {
    try {
      const response = await axios.get("/tiposocietario/gettipossocietarios");
      return response; // Asegúrate de retornar el objeto completo si lo necesitas
    } catch (error) {
      console.error("Error al obtener los tipos societarios", error);
      throw error; // Es importante manejar el error de alguna forma
    }
  };