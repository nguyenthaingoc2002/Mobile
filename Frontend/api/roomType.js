import axios from "./axios";

export const getRoomTypeAPI = async () => {
  try {
    const response = await axios.get("/roomType/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getPriceAPI = async (data) => {
  try {
    const response = await axios.post("/roomType/getPrice", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};