import mongoose from "mongoose";
const types = {
  values: ["BREAKFAST", "GENERAL", "DRINK", "SALE"],
  message: "{VALUE} no es un rol válido",
};
const dishSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: { unique: true },
  },
  cost: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  timeToCook: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  type: { type: String, default: "GENERAL", enum: types },
});
export const Dish = mongoose.model("Dish", dishSchema);
