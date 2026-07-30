import { Router } from "express";
import {
  getAllWatchlists,
  addWatchlist,
  removeWatchlist,
} from "../controllers/watchlistController.js";

const router = Router();

router.get("/", getAllWatchlists);
router.post("/", addWatchlist);
router.delete("/:id", removeWatchlist);

export default router;
