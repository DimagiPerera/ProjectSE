import express from "express";
const router = express.Router();
import {
  createUser,
  login,
  getAccessToken,
  resetPassword,
  register,
  getAllUsers,
  getUser,
  logout,
} from "../controllers/usercontroller";
import auth from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth";

router.post("/createUser", createUser);
router.post("/login", login);
router.post("/refresh_token", getAccessToken);
router.post("/reset", auth, resetPassword);
router.post("/register", register);
router.get("/fetchAll", auth, adminAuth, getAllUsers);
router.get("/fetchOne", auth, getUser);
router.get("/logout", auth, logout);

export default router;