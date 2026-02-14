import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(400).json({ message: "User already exists" });

  const user = await User.create({ name, email, password });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};

export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  console.log(`[authUser] login attempt for email=${email}`);
  if (!user) {
    console.log("[authUser] user not found");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  console.log("[authUser] stored hash:", user.password);
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("[authUser] bcrypt.compare result:", isMatch);

  if (!isMatch) {
    console.log("[authUser] password mismatch");
    return res.status(401).json({ message: "Invalid email or password" });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: generateToken(user._id),
  });
};
