import City from "../models/CityModel.js";

export const createCity = async (req, res) => {
  try {
    const { name } = req.body;
    const newCity = new City({
      name: name,
    });
    newCity.save();
    res.status(200).json({
      success: true,
      msg: "Create City Success",
      newCity: newCity,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCity = async (req, res) => {
    try {
      const listCity = await City.find();
      res.status(200).json({
        success: true,
        msg: "Find All City Success",
        listCity: listCity,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };