import { Router } from "express";
import {
  createOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/createOrder", requireToken, tokenHeaderValidator, createOrder);
router.get("/", requireToken, tokenHeaderValidator, getOrders);
router.get("/userOrders", requireToken, tokenHeaderValidator, getOrders);
router.get("/active", requireToken, tokenHeaderValidator, getActiveOrders);
router.patch("/update/:id", requireToken, tokenHeaderValidator, updateOrder);

export default router;
