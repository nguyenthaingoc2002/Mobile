import axios from "./axios";

export const loginAPI = async (data) => {
  try {
    const response = await axios.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const registerAPI = async (data) => {
    try {
      const response = await axios.post("/auth/register", data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };