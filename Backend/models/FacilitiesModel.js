import mongoose from "mongoose";

const FacilitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    }
  },
  { timestamps: true }
);

const Facilities = mongoose.model("Facilities", FacilitiesSchema);
export default Facilities;
