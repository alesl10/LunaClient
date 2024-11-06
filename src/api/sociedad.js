import axios from "./axios.js";

export const getSociedad = (modelo) =>
  axios.post("/expediente/getExpedientes", modelo);
