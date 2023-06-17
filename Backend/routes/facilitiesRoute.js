import express from "express";
import { createFacilities } from "../controllers/facilitiesController.js";

const router = express.Router();
router.post("/", createFacilities);

export default router;
