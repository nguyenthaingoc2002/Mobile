import express from "express";
import { cancelBooking, createBooking, getAllBooking } from "../controllers/bookingController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.post("/",verifyToken, createBooking);
router.get("/",verifyToken, getAllBooking);
router.post("/cancelBooking/:booking_id",verifyToken, cancelBooking);
export default router;
