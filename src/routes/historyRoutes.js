import express from "express";
import { getAllHistory, addHistory } from "../controllers/historyController.js";

const router = express.Router();

router.get("/", getAllHistory);
router.post("/", addHistory);

export default router;
