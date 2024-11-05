// create resturant

const resturantModel = require("../models/resturantModel");

const createResturantController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Title and address are required",
      });
    }

    const newResturant = new resturantModel({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      coords,
    });

    await newResturant.save();

    res.status(201).send({
      success: true,
      message: "Resturant created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create resturant API",
      error,
    });
  }
};

module.exports = { createResturantController };
