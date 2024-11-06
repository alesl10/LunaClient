import axios from "./axios.js";

export const getTramites = async (tramite) =>
  axios.post("/tramite/gettramites", tramite);

  
export const getTramitesDigitalizados = async (tramite) =>
  axios.post("/tramite/gettramitesdigitalizados", tramite);

export const getPdfBinario = async (tramite) => {
  try {
    const response = await axios.post("/archivo/getpdfbinario", tramite);
    return response;
  } catch (error) {
    console.error("Error al obtener el PDF binario:", error);
    throw error;
  }
};
