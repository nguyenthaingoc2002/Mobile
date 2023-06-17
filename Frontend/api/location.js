import axios from "./axios";
const apiKey = "1f6ee6321c963bedf422d26c3ac3f1cd";
export const getCityByCoordinates = async (lat, lon) => {
    try {
      console.log(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`);
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5&appid=${apiKey}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
};