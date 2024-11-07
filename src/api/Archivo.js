import axios from "./axios.js";

export const getPdfBinario = async (tramite) => {
  try {
    const response = await axios.post("/archivo/getpdfbinario", tramite);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el PDF binario:", error);
    throw error;
  }
};

export const getZipBalanceBinario = async (balance) => {
  try {
    const response = await axios.post("/archivo/getzipbalancebinario", balance);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el balance zip", error);
  }
};
