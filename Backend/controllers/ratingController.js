import Booking from "../models/BookingModel.js";
import Hotel from "../models/HotelModel.js";
import Rating from "../models/RatingModel.js";
import Room from "../models/RoomModel.js";

export const createRating = async (req, res) => {
  try {
    const { rating_score, comment, booking_id } = req.body;
    await Booking.findByIdAndUpdate(booking_id, { isRating: true });
    let booking = await Booking.findById(booking_id);
    let room = await Room.findById(booking.room_id);
    let hotel = await Hotel.findById(room.hotel_id);
    hotel.rating = ((hotel.rating * hotel.numberRating + rating_score) / (++hotel.numberRating)).toFixed(1);
    await hotel.save();
    const newRating = new Rating({
      rating_score: rating_score,
      comment: comment,
      booking_id: booking_id,
    });
    newRating.save();
    res.status(200).json({
      success: true,
      msg: "Create Rating Success",
      newRating: newRating,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteRating = async (req, res) => {
  try {
    await Rating.findByIdAndDelete(req.params.ratingID);
    res.status(200).json({
      success: true,
      msg: "Delete Rating Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findRating = async (req, res) => {
  try {

    const rating = await Rating.findOne({booking_id: req.params.booking_id});
    res.status(200).json({
      success: true,
      msg: "Find Rating Success",
      rating: rating
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};