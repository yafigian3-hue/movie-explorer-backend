import express from "express";
import {
  getAllHistory,
  addHistory,
  deleteAllHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getAllHistory);
router.post("/", addHistory);
router.delete("/", deleteAllHistory);

export default router;
