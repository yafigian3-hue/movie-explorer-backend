import { Router } from "express";
import {
  getAllWatchlists,
  addWatchlist,
  removeWatchlist,
} from "../controllers/watchlistController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllWatchlists);
router.post("/", authMiddleware, addWatchlist);
router.delete("/:id", authMiddleware, removeWatchlist);

export default router;
