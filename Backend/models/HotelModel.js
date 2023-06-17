import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    city_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "City",
    },
    district_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "District",
    },
    description: {
      type: String,
      require: true,
    },
    rating: {
      type: Number,
      require: true,
      default: 0,
    },
    numberRating: {
      type: Number,
      require: true,
      default: 0,
    },
    url_picture: {
      type: String,
    },
    facilities: [{
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Facilities",
    }],
    price_min: {
      type: Number,
      require: true
    },
    price_max: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
);

const Hotel = mongoose.model("Hotel", HotelSchema);
export default Hotel;
