import { request } from "express";
import {
  body,
  param,
  cookie,
  header,
  validationResult,
} from "express-validator";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const validationResultExpress = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

export const registerValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "La contraseña debe tener al menos 6 caracteres, 1 caracter en minúscula, 1 caracter en mayúscula, 1 número y 1 símbolo").isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    returnScore: false,
  }),
  body("password", "Contraseñas no coinciden").custom(
    (value, { req }) => {
      if (value !== req.body.repassword) {
        throw new Error("No coinciden las contraseñas");
      }
      return value;
    }
  ),
  validationResultExpress,
];

export const loginValidator = [
  body("email", "Formato de email incorrecto")
    .trim()
    .isEmail()
    .normalizeEmail(),
  body("password", "Mínimo 6 carácteres").trim().isLength({ min: 6 }),
  validationResultExpress,
];

export const tokenHeaderValidator = [
  header("authorization", "No existe el token").trim().notEmpty().escape(),
  validationResultExpress,
];

export const orderValidator = [
  body("dishes", "La lista de platillos no debe estar vacia").notEmpty(),
  body("totalCost", "El costo debe ser un número").isNumeric(),
  body("stimatedTime", "El tiempo de cocción debe ser un número").isNumeric(),
  validationResultExpress,
];

export const updateValidator = [
  param("id", "Formato de id incorrecto").trim().isLength({ min: 24 }),
  validationResultExpress,
];

export const tokenCookieValidator = [
  cookie("refreshToken", "No existe refresh Token").trim().notEmpty().escape(),
  validationResultExpress,
];

export const dishValidator = [
  body("title", "El título no debe estar vacio").notEmpty(),
  body("cost", "El costo debe ser un número").isNumeric(),
  body("timeToCook", "El tiempo de cocción debe ser un número").isNumeric(),
  validationResultExpress,
];

export const verifyRol = async (req, res, next) => {
  let token = req.headers?.authorization;
  token = token.split(" ")[1];
  const user = await User.findById(req.uid);
  console.log(user);
  if (user.role !== "ADMIN") {
    return res.status(401).json({
      message: "Rol no autorizado",
    });
  }
  next();
};
