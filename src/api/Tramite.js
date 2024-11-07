import axios from "./axios.js";

export const getTramites = async (tramite) =>
  axios.post("/tramite/gettramites", tramite);

  
export const getTramitesDigitalizados = async (tramite) =>
  axios.post("/tramite/gettramitesdigitalizados", tramite);

