import express from "express";
import { registerUser, authUser, refreshAuthToken, logoutUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser);
router.post("/refresh", refreshAuthToken);
router.post("/logout", logoutUser);

export default router;
