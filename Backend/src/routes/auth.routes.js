import express from "express";
import { registerController, loginController, logoutController } from "../controller/auth.controller.js";
import { registerValidation } from "../middleware/validation.middleware.js";
const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginController);
router.delete("/logout", logoutController);

export default router;