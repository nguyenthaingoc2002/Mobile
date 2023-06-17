import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { createRoomType, getPrice, getRoomType } from "../controllers/roomTypeController.js";
const router = express.Router();
router.post("/", createRoomType);
router.get("/", getRoomType);
router.post("/getPrice", getPrice);
export default router;
