import axios from "./axios";

export const calculateEmptyRoomAPI = async (data) => {
  try {
    const response = await axios.post("/room/emptyRoom", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};