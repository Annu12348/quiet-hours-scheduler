import express from "express";
import { blockController } from "../controller/block.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { blockValidator } from "../middleware/block.validation.js";
const router = express.Router();

router.post("/createblock", blockValidator, authMiddleware,  blockController)

export default router;