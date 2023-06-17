import axios from "./axios";

export const getDistrictByCityAPI = async (city_id) => {
  try {
    const response = await axios.get(`/district/${city_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};