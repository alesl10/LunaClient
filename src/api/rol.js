import axios from "./axios.js";

export const getAllRoles = async () => {
  try {
    const response = await axios.get("/rol/getallroles");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

