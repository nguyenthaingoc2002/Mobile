import axios from "./axios";
import * as SecureStore from 'expo-secure-store';
export const createRatingAPI = async (data) => {
  try {
    const response = await axios.post("/rating", data, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const findRatingAPI = async (booking_id) => {
  try {
    const response = await axios.get(`/rating/findByBookingId/${booking_id}`, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};