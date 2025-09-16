import express from "express";
import {
  blockController,
  deleteController,
  listBlocks,
  updateController,
} from "../controller/block.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { blockValidator } from "../middleware/block.validation.js";
const router = express.Router();

router.post("/createblock", blockValidator, authMiddleware, blockController);
router.get("/list", authMiddleware, listBlocks);
router.delete("/delete/:blockId", authMiddleware, deleteController);
router.put("/update/:blockId", authMiddleware, updateController);

export default router;