import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
  userOrders,
} from "../controllers/order.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
  updateValidator,
  orderValidator,
  updateOrderValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post(
  "/createOrder",
  requireToken,
  tokenHeaderValidator,
  orderValidator,
  createOrder
);
router.get("/", requireToken, tokenHeaderValidator, verifyRol, getOrders);
router.get("/userOrders", requireToken, tokenHeaderValidator, userOrders);
router.patch(
  "/update/:id",
  requireToken,
  tokenHeaderValidator,
  verifyRol,
  updateOrderValidator,
  updateOrder
);

export default router;
