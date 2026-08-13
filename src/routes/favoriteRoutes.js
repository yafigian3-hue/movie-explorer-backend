import { Router } from "express";
import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authMiddleware, getAllFavorites);
router.post("/", authMiddleware, addFavorite);
router.delete("/:id", authMiddleware, removeFavorite);

export default router;
