import { Router } from "express";
import { createOrder } from "../controllers/order.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post("/createOrder", requireToken, tokenHeaderValidator, createOrder);

export default router;
