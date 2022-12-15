import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, username, name, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Ya existe este usuario" });
    }

    let confirmationCode = jwt.sign({ email }, process.env.JWT_SECRET);
    confirmationCode = confirmationCode.substring(1, 10);
    const transport = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAILEMAIL,
        pass: process.env.GMAILPASSWORD,
      },
    });

    transport
      .sendMail({
        from: process.env.GMAILEMAIL,
        to: email,
        subject: "Por favor, confirme su cuenta",
        html: `<h1>Correo de confirmación</h1>
            <h2> Hola, ${name}</h2>
            <p>Gracias por registrarte. Por favor, da clic en el link para confirmar tu registro</p>
            <a href=http://localhost:9000/confirm/${confirmationCode}>Clic aquí</a>
            `,
      })
      .catch((err) => console.log(err));
    user = new User({
      email,
      password,
      username,
      name,
      role,
      confirmationCode,
    });
    await user.save();
    return res
      .status(201)
      .json("Por favor, verifica tu cuenta desde el correo de confirmación");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ error: "Contraseña o usuario incorrecto" });
    }
    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword) {
      return res.status(403).json({ error: "Contraseña o usuario incorrecto" });
    }
    if (user.state != "ACTIVE") {
      return res.status(401).json({
        error: "No se ha confirmado el usuario, por favor verifique en correo",
      });
    }
    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);
    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const update = async (req, res) => {
  const { username, name } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(400).json({ error: "No existe este usuario" });
    }
    user.username = username._value;
    user.name = name._value;
    await user.save();
    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return res.json({
      email: user.email,
      name: user.name,
      username: user.username,
      image: user.image,
      id: user.id,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const infoUser = async (req, res) => {
  try {
    const user = await User.findById(req.uid);
    return res.json({
      email: user.email,
      name: user.name,
      username: user.username,
      image: user.image,
      id: req.uid,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidorr" });
  }
};

export const refreshToken = (req, res) => {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (error) {
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ ok: true });
};

export const verifyUser = async (req, res) => {
  try {
    const user = await User.findOne({
      confirmationCode: req.params.confirmationCode,
    });
    if (!user) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    user.state = "ACTIVE";
    await user.save();
    return res.status(200).json("Usuario validado");
  } catch (error) {
    return res.status(500).json({ error: "Error de servidorr" });
  }
};
