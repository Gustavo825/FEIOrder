import { Router } from "express";
import {
  getDishes,
  createDish,
  updateDish,
} from "../controllers/dish.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import {
  tokenHeaderValidator,
  verifyRol,
  dishValidator,
  updateValidator,
} from "../middlewares/validatorManager.js";

const router = Router();

router.post(
  "/createDish",
  tokenHeaderValidator,
  requireToken,
  verifyRol,
  dishValidator,
  createDish
);

router.patch(
  "/update/:id",
  tokenHeaderValidator,
  requireToken,
  verifyRol,
  dishValidator,
  updateValidator,
  updateDish
);
router.get("/", getDishes);

export default router;
