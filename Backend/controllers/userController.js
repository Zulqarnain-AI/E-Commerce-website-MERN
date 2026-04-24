import User from "../models/User.js";
import generateToken, { generateRefreshToken } from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const buildAuthResponse = async (user, res) => {
  const token = generateToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  user.refreshToken = refreshToken;
  await user.save();

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
    refreshToken,
  });
};

export const registerUser = async (req, res) => {
  const { name, email, password, isAdmin, adminSecret } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email and password are required" });
  }

  let registerAsAdmin = false;
  if (isAdmin) {
    if (!process.env.ADMIN_REGISTRATION_SECRET) {
      return res.status(500).json({ message: "Admin registration is not configured" });
    }

    if (adminSecret !== process.env.ADMIN_REGISTRATION_SECRET) {
      return res.status(403).json({ message: "Invalid admin registration secret" });
    }

    registerAsAdmin = true;
  }

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({
    name,
    email,
    password,
    isAdmin: registerAsAdmin,
  });

  await buildAuthResponse(user, res);
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  await buildAuthResponse(user, res);
};

export const refreshAuthToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token required" });
  }

  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch {
    return res.status(401).json({ message: "Invalid or expired refresh token" });
  }

  const user = await User.findOne({
    _id: decoded.id,
    refreshToken,
  });

  if (!user) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }

  await buildAuthResponse(user, res);
};

export const logoutUser = async (req, res) => {
  const { refreshToken } = req.body;

  if (refreshToken) {
    await User.updateOne({ refreshToken }, { $set: { refreshToken: null } });
  }

  res.json({ message: "Logged out" });
};
