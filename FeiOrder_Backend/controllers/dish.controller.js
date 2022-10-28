import { Dish } from "../models/Dish.js";

export const getDishes = async (req, res) => {
  const { email, password, username, name } = req.body;
  try {
    const dishes = await Dish.find({ uid: req.uid }).lean();
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

export const updateDish = async (req, res) => {
  const { title, cost, description, timeToCook,categoryVal } = req.body;
  console.log(title)
  try {
    console.log(req.params.id);
    const dish = await Dish.findById(req.params.id);
    dish.title = title;
    dish.cost = cost;
    dish.description = description;
    dish.timeToCook = timeToCook;
    dish.type = categoryVal;
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
