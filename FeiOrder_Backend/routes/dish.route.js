// GET      api/v1/links                all links
// GET      api/v1/links/:nanoLink      search link
// POST     api/v1/links                create link
// PATCH    api/v1/links                update link
// DELETE   api/v1/links/:nanoLink      remove link
import { Router } from "express";
import { getDishes, createDish, updateDish } from "../controllers/dish.controller.js";
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
  createDish,
);
router.patch("/update/:id", tokenHeaderValidator, updateDish);

export default router;
