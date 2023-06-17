import axios from "./axios";
import * as SecureStore from 'expo-secure-store';
export const createBookingAPI = async (data) => {
  try {
    console.log(await SecureStore.getItemAsync("token"));
    const response = await axios.post("/booking", data, {
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBookingAPI = async () => {
  try {
    const response = await axios.get("/booking",{
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const cancelBookingAPI = async (booking_id) => {
  try {
    console.log(await SecureStore.getItemAsync("token"));
    const response = await axios.post(`/booking/cancelBooking/${booking_id}`,{},{
      headers: {
        Authorization: `Bearer ${await SecureStore.getItemAsync("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};