import axios from "./axios.js";

export const getTramites = async (tramite) => {
  try {
    const response = axios.post("/tramite/gettramites", tramite);
    return response;
  } catch (error) {
    console.error("No se pudo obtener los tramites", error);
  }
};

export const getTramitesDigitalizados = async (tramite) =>
  axios.post("/tramite/gettramitesdigitalizados", tramite);

export const GetTramitesDestino = async (destino) => {
  try {
    const response = await axios.post("/destinoTramite", destino);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
