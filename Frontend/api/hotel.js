import axios from "./axios";

export const getHotelByCityAndDistrictAPI = async (city_id, district_id) => {
  try {
    const response = await axios.get(`/hotel/findByCityAndDistrict/${city_id}/${district_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedHotelsAPI = async (text) => {
  try {
    const response = await axios.get(`/hotel/findSuggestHotels/${text}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getNearHotelsAPI = async (text) => {
  try {
    const response = await axios.get(`/hotel/findNearHotels/${text}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findTopHotelsAPI = async () => {
  try {
    const response = await axios.get("/hotel/findTopHotels");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};