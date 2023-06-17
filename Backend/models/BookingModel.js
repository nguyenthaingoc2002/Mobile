import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    amount: {
      type: Number,
      require: true,
    },
    start_day: {
      type: Date,
      required: true,
    },
    end_day: {
      type: Date,
      required: true,
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Room",
    },
    isCancel: {
      type: Boolean,
      require: true,
      default: false,
    },
    isRating: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
