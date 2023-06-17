import express from "express";
import { createHotel, findNearHotels, findSuggestedHotels, findTopHotels, getHotelByCityAndDistrict } from "../controllers/hotelController.js";

const router = express.Router();
router.get("/findNearHotels/:text", findNearHotels);
router.get("/findTopHotels", findTopHotels);
router.get("/findSuggestHotels/:text", findSuggestedHotels);
router.get("/findByCityAndDistrict/:city_id/:district_id", getHotelByCityAndDistrict);
router.post("/", createHotel);
export default router;
