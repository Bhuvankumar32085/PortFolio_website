import express from "express";
import { getAdminUser, login, logout, signup, updateProfile, verifyOtp } from "../controllers/userController.js";
import { verifyUser } from "../middleware.js/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/logout", logout);
router.get("/get-admin", getAdminUser);
router.post("/update-profile",verifyUser,updateProfile);

export default router;