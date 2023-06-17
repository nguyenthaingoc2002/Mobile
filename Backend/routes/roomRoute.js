import express from "express";
import { calculateEmptyRoom, createRoom } from "../controllers/roomController.js";
const router = express.Router();
router.post("/", createRoom);
router.post("/emptyRoom", calculateEmptyRoom);
export default router;
