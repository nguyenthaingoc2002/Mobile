import RoomType from "../models/RoomTypeModel.js";
import Room from "../models/RoomModel.js"
export const createRoomType = async (req, res) => {
  try {
    const { name, hotel_id, url_picture, room_size, number_person, bed } =
      req.body;
    const newRoomType = new RoomType({
      name: name,
      url_picture: url_picture,
      room_size: room_size,
      number_person: number_person,
      bed: bed,
    });
    const savedRoomType = await newRoomType.save();
    res.status(200).json({
      success: true,
      msg: "Create Room Type Success",
      newRoomType: savedRoomType,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getRoomType = async (req, res) => {
  try {
    const listRoomType = await RoomType.find();
    res.status(200).json({
      success: true,
      msg: "Create Room Type Success",
      listRoomType: listRoomType,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPrice = async (req, res) => {
  try {
    const {roomType_id, hotel_id} = req.body;
    const room = await Room.findOne({roomType_id: roomType_id, hotel_id: hotel_id});
    res.status(200).json({
      success: true,
      msg: "Get Price Success",
      price: room.price,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
