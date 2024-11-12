import axios from "./axios.js";

export const getTiposTramites = async () => {
  try {
    const response = await axios.get("/tipotramite/getTiposTramites");
    return response.data;
  } catch (error) {
    console.error("error al obtener los tipos societarios", error);
    throw error;
  }
};

export const getTiposTramitesByCodigo = async (codigo) => {
  try {
    const response = await axios.get(
      `/TipoTramite/GetTramitesbyCodigoTramite?codigo=${codigo}`
    );
    return response.data;
  } catch (error) {
    console.error("error al obtener los tipos societarios", error);
    throw error;
  }
};
