import mongoose from "mongoose";
import { Dish } from "../models/Dish.js";
import moment from "moment-timezone";
const dateMexico = moment.tz(Date.now(), "America/Mexico_City");

const types = {
  values: ["CREATED", "COOKING", "DELIVERED", "CANCELED"],
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
    default: dateMexico,
  },
  state: { type: String, default: "CREATED", enum: types },
});
export const Order = mongoose.model("Order", orderSchema);
