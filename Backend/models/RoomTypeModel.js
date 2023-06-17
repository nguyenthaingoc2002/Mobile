import mongoose from "mongoose";

const RoomTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    url_picture: {
      type: String,
    },
    room_size: {
      type: Number,
      require: true,
    },
    number_person: {
      type: Number,
      require: true,
    },
    bed: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const RoomType = mongoose.model("RoomType", RoomTypeSchema);
export default RoomType;
