import { Dish } from "../models/Dish.js";

export const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find();
    console.log(dishes);
    return res.json({ dishes });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const createDish = async (req, res) => {
  const { title, cost, description, timeToCook, state, date, type } = req.body;
  try {
    let dish = await Dish.findOne({ title });
    if (dish) throw { code: 11000 };

    dish = new Dish({
      title,
      cost,
      description,
      timeToCook,
      state,
      date,
      type,
    });
    await dish.save();

    return res.status(201).json({ dish });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.status(400).json({ error: "Ya existe este platillo" });
    }
    return res.status(500).json({ error: "Error de servidor" });
  }
};
