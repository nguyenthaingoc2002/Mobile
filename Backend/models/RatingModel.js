import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema(
  {
    rating_score: {
      type: Number,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Booking",
    },
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);
export default Rating;
