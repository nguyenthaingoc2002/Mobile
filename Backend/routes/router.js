import authRoute from "./authRoute.js";
import cityRoute from "./cityRoute.js";
import districtRoute from "./districtRoute.js";
import facilitiesRoute from "./facilitiesRoute.js";
import hotelRoute from "./hotelRoute.js";
import ratingRoute from "./ratingRoute.js";
import roomTypeRoute from "./roomTypeRoute.js";
import roomRoute from "./roomRoute.js"
import bookingRoute from "./bookingRoute.js"
import express from "express";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/city", cityRoute);
router.use("/district", districtRoute);
router.use("/hotel", hotelRoute);
router.use("/facilities", facilitiesRoute);
router.use("/rating", ratingRoute);
router.use("/roomType", roomTypeRoute);
router.use("/room", roomRoute);
router.use("/booking", bookingRoute);
export default router;
