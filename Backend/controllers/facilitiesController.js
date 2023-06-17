import Facilities from "../models/facilitiesModel.js";


export const createFacilities = async (req, res) => {
  try {
    const { name } = req.body;
    const newFacilities = new Facilities({
      name: name,
    });
    newFacilities.save();
    res.status(200).json({
      success: true,
      msg: "Create Facilities Success",
      newFacilities: newFacilities,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
