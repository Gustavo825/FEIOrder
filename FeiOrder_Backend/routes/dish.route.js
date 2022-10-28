import { Router } from "express";
import { getDishes, createDish } from "../controllers/dish.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
} from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", getDishes);
router.post(
  "/createDish",
  requireToken,
  tokenHeaderValidator,
  verifyRol,
  createDish
);

export default router;
