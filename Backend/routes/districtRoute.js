import express from "express";
import {
  createDistrict,
  getAllDistrictByCity,
} from "../controllers/districtController.js";

const router = express.Router();
router.post("/", createDistrict);
router.get("/:city_id", getAllDistrictByCity);

export default router;
