import Booking from "../models/BookingModel.js";
import Room from "../models/RoomModel.js";
export const createBooking = async (req, res) => {
  try {
    const { start_day, end_day, amount, hotel_id, roomType_id } = req.body;
    const listRoom = await Room.find({
      hotel_id: hotel_id,
      roomType_id: roomType_id,
    });
    let newBooking;
    for (const room of listRoom) {
      const listBooking = await Booking.find({
        room_id: room.id,
        isCancel: false,
        start_day: { $lte: start_day },
        end_day: { $gt: start_day },
      });
      if (listBooking.length == 0) {
        newBooking = new Booking({
          user: req.user.id,
          start_day: start_day,
          end_day: end_day,
          amount: amount,
          room_id: room.id,
        });
        break;
      }
    }
    const savedBooking = await newBooking.save();
    res.status(200).json({
      success: true,
      msg: "Create Booking Success",
      newBooking: savedBooking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllBooking = async (req, res) => {
  try {
    const listBooking = await Booking.find({ user: req.user.id }).populate({
      path: "room_id",
      populate: {
        path: "roomType_id",
        model: "RoomType",
      },
    }).populate({
      path: "room_id",
      populate: {
        path: "hotel_id",
        model: "Hotel",
      },
    });
    res.status(200).json({
      success: true,
      msg: "Get All Booking Success",
      listBooking: listBooking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndUpdate(req.params.booking_id, {isCancel: true});
    const booking = await Booking.findById(req.params.booking_id);
    res.status(200).json({
      success: true,
      msg: "Cancel Booking Success",
      cancelBooking: booking,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
