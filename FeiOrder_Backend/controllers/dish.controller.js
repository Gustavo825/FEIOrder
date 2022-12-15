import { Dish } from "../models/Dish.js";

export const createDish = async (req, res) => {
  const { title, cost, description, timeToCook, state, date, type } = req.body;
  try {
    let dish = await Dish.findOne({ title });
    if (dish) {
      return res.status(400).json({ error: "Ya existe este platillo" });
    }
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
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const updateDish = async (req, res) => {
  const { title, cost, description, timeToCook, type } = req.body;
  try {
    console.log(req.params.id);
    const dish = await Dish.findById(req.params.id);
    if (typeof title === "string") {
      dish.title = title;
    } else {
      dish.title = title._value;
    }
    if (typeof cost === "string") {
      dish.cost = cost;
    } else {
      dish.cost = cost._value;
    }

    if (typeof description === "string") {
      dish.description = description;
    } else {
      dish.description = description._value;
    }
    if (typeof timeToCook === "string") {
      dish.timeToCook = timeToCook;
    } else {
      dish.timeToCook = timeToCook._value;
    }
    if (typeof type === "string") {
      dish.type = type;
    } else {
      dish.type = type._value;
    }

    await dish.save();
    return res.status(201).json({ dish });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

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
