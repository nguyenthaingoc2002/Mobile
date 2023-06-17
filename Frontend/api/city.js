import axios from "./axios";

export const getAllCityAPI = async () => {
  try {
    const response = await axios.get("/city");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};