import express from "express";
import { createRating, deleteRating, findRating } from "../controllers/ratingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.get("/findByBookingId/:booking_id", findRating);
router.post("/",verifyToken, createRating);
router.delete("/:ratingID",verifyToken, deleteRating)
export default router;
