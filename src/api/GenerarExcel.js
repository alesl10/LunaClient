import axios from "./axios.js";

export const generateExcelTipoTramite = async (filteredItems) => {
  try {
    const response = await axios.post(
      "/GenerarExcel/generateExcelTipoTramite",
      filteredItems,
      {
        headers: {
          "Content-Type": "application/json", 
        },
        responseType: "blob", 
      }
    );
    return response;
  } catch (error) {
    console.log("No se pudo generar el excel", error);
    throw error;
  }
};
