import axios from "./axios.js";

export const generatePDFTipoTramite = async (filteredItems) => {
  try {
    // Realiza la solicitud POST para obtener el PDF codificado en base64
    const response = await axios.post(
      "/GenerarPDF/generatePDFTipoTramite",
      filteredItems,
      {
        headers: {
          "Content-Type": "application/json", // O el tipo adecuado si es otro
        },
        responseType: "blob", // Asegúrate de que Axios maneje la respuesta como un Blob
      }
    );
    return response;
  } catch (error) {
    console.log("No se pudo generar el pdf", error);
    throw error;
  }
};
