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

export const GetTramitesDestinoRecibidos = async (destino) => {
  try {
    const response = await axios.post("/destinoTramite", destino);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const GetTramitesSinRecibir = async (destino) => {
  try {
    const response = await axios.get(`/DestinoTramite?destinoDpto=${destino}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const RecibirAsignar = async (tramite) => {
  try {
    const response = await axios.put(
      "/destinoTramite/RecibirAsignar",
      tramite
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};


export const EnviarTramite = async (tramite) => {
  try {
    const response = await axios.put(
      "/destinoTramite/Enviar",
      tramite
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
