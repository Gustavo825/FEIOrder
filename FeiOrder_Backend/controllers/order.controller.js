import { Order } from "../models/Order.js";

export const createOrder = async (req, res) => {
  const { totalCost, comment, stimatedTime, dishes } = req.body;
  try {
    const userID = req.uid;
    const order = new Order({
      userID,
      totalCost,
      comment,
      stimatedTime,
      dishes,
    });
    await order.save();

    return res.status(201).json({ order });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    return res.json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const userOrders = async (req, res) => {
  try {
    const id = req.uid;
    const userOrders = await Order.find( {userID: id})
   return res.json( {})
  } catch (error) {
    return res.status(500).json({ error: "error de server" });
export const getActiveOrders = async (req, res) => {
  try {
    const orders = await Order.find(
      { state: "CREATED" } || { state: "COOKING" }
    );
    return res.json({ orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};
