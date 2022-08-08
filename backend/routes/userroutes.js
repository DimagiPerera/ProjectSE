import express from "express";
const router = express.Router();
import {
  createUser,
  login,
  getAccessToken,
  resetPassword,
  registerUser,
  getAllUsersInfo,
  getUserInfo,
  logout,
} from "../controllers/userCtrl.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

router.post("/createUser", createUser);
router.post("/login", login);
router.post("/refresh_token", getAccessToken);
router.post("/reset", auth, resetPassword);
router.post("/register", registerUser);
router.get("/allUsers", auth, authAdmin, getAllUsersInfo);
router.get("/userInfo", auth, getUserInfo);
router.get("/logout", auth, logout);

export default router;
