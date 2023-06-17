import mongoose from "mongoose";

const DistrictSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "City",
      },
  },
  { timestamps: true }
);

const District = mongoose.model("District", DistrictSchema);
export default District;
