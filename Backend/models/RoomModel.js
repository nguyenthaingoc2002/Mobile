import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    roomType_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "RoomType",
    },
    hotel_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Hotel",
    },
    price: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
export default Room;
