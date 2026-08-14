import express from "express";
import {
  getAllHistory,
  addHistory,
  deleteAllHistory,
} from "../controllers/historyController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllHistory);
router.post("/", authMiddleware, addHistory);
router.delete("/", authMiddleware, deleteAllHistory);

export default router;
