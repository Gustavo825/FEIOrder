import { User } from "../models/User.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
  const { email, password, username, name, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ error: "Ya existe este usuario" });

    user = new User({ email, password, username, name, role });
    await user.save();

    const { token, expiresIn } = generateToken(user.id);
    generateRefreshToken(user.id, res);

    return res.status(201).json({ token, expiresIn });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error de servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user)
      return res.status(403).json({ error: "Contraseña o usuario incorrecto" });

    const respuestaPassword = await user.comparePassword(password);
    if (!respuestaPassword)
      return res.status(403).json({ error: "Contraseña o usuario incorrecto" });

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
    if (!user) return res.status(400).json({ error: "No existe este usuario" });
    user.username = username;
    user.name = name;
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
