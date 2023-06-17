import City from "../models/CityModel.js";
import Hotel from "../models/HotelModel.js";
export const createHotel = async (req, res) => {
  try {
    const { name, address, city_id, district_id, description, url_picture, price_min, price_max, facilities } =
      req.body;
    const newHotel = new Hotel({
      name: name,
      address: address,
      city_id: city_id,
      district_id: district_id,
      description: description,
      url_picture: url_picture,
      price_min: price_min,
      price_max: price_max,
      facilities: facilities
    });
    newHotel.save();
    res.status(200).json({
      success: true,
      msg: "Create Hotel Success",
      newHotel: newHotel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getHotelByCityAndDistrict = async (req, res) => {
  try {
    const listHotel = await Hotel.find({city_id: req.params.city_id, district_id: req.params.district_id}).populate("facilities")
    res.status(200).json({
      success: true,
      msg: "Find Hotel By City And District Success",
      listHotel: listHotel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const findSuggestedHotels = async (req, res) => {
  try {
    const text = req.params.text;
    console.log(text);
    const listHotel = await Hotel.find({
      name: { $regex: text },
    }).populate("facilities");
    res.status(200).json({
      success: true,
      msg: "Find Suggested Hotels Success",
      listHotel: listHotel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findNearHotels = async (req, res) => {
  try {
    const text = req.params.text;
    const city = await City.findOne({name: text});
    const listHotel = await Hotel.find({city_id: city._id}).populate("facilities");
    res.status(200).json({
      success: true,
      msg: "Find Near Hotels Success",
      listHotel: listHotel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const findTopHotels = async (req, res) => {
  try {
    let listHotel = await Hotel.find().populate("facilities");
    console.log(listHotel);
    console.log("OKKK");
    listHotel.sort((a, b) => {
      return b.rating - a.rating;
    })
    listHotel = listHotel.slice(0,3);
    res.status(200).json({
      success: true,
      msg: "Find Top Hotels Success",
      listHotel: listHotel,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};