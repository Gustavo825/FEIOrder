import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/createOrder", requireToken, tokenHeaderValidator, createOrder);
router.get("/", requireToken, tokenHeaderValidator, getOrders);
router.get("/userOrders", requireToken, tokenHeaderValidator, getOrders);

export default router;
