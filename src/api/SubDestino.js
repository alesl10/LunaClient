import axios from "./axios.js";

export const getSubDestinos = async (destino) => {
  try {
const response = await axios.get(`/subdestino/getsubdestinos?destino=${destino}`)
return response.data;  
} catch (error) {
console.log(error);
    throw error;
  }
};
