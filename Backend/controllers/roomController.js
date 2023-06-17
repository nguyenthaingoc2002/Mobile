import Booking from "../models/BookingModel.js";
import Room from "../models/RoomModel.js";

export const createRoom = async (req, res) => {
  try {
    const { name, roomType_id, hotel_id, price } = req.body;
    const newRoom = new Room({
      name: name,
      roomType_id: roomType_id,
      hotel_id: hotel_id,
      price: price,
    });
    const savedRoom = await newRoom.save();
    res.status(200).json({
      success: true,
      msg: "Create Room Type Success",
      newRoom: savedRoom,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const calculateEmptyRoom = async (req, res) => {
  try {
    const { hotel_id, roomType_id, start_day} = req.body;
    console.log(req.body);
    let result = 0;
    const listRoom = await Room.find({
      hotel_id: hotel_id,
      roomType_id: roomType_id,
    });
    for (const room of listRoom) {
        const listBooking = await Booking.find({room_id: room.id,isCancel: false, start_day: {$lte: start_day}, end_day: {$gt: start_day}});
        if(listBooking.length == 0) {
            result++;
        } 
    }
    res.status(200).json({
      success: true,
      msg: "Calculate Empty Room Success",
      numberEmptyRoom: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
