import express from "express";
import { createCity, getAllCity } from "../controllers/cityController.js";

const router = express.Router();
router.post("/", createCity);
router.get("/", getAllCity);
export default router;
