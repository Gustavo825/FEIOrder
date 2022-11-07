import mongoose from "mongoose";
import { Dish } from "../models/Dish.js";
var current = new Date();
const timeStamp = new Date(
  Date.UTC(
    current.getFullYear(),
    current.getMonth(),
    current.getDate(),
    current.getHours(),
    current.getMinutes(),
    current.getSeconds(),
    current.getMilliseconds()
  )
);
const types = {
  values: ["CREATED", "COOKING", "READY TO PICK UP", "DELIVERED", "CANCELED"],
  message: "{VALUE} no es un estado válido",
};
const orderSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    trim: true,
  },
  totalCost: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  comment: {
    type: String,
  },
  stimatedTime: {
    type: String,
  },
  state: {
    type: Boolean,
    default: true,
  },
  dishes: {
    type: [],
  },
  date: {
    type: Date,
    default: timeStamp,
  },
  state: { type: String, default: "CREATED", enum: types },
});
export const Order = mongoose.model("Order", orderSchema);
