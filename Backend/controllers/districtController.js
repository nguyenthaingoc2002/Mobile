import District from "../models/DistrictModel.js";

export const createDistrict = async (req, res) => {
  try {
    const { name, city_id } = req.body;
    const newDistrict = new District({
      name: name,
      city_id: city_id,
    });
    newDistrict.save();
    res.status(200).json({
      success: true,
      msg: "Create District Success",
      newDistrict: newDistrict,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllDistrictByCity = async (req, res) => {
  try {
    const listDistrict = await District.find({city_id: req.params.city_id});
    res.status(200).json({
      success: true,
      msg: "Find District By City Success",
      listDistrict: listDistrict,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
