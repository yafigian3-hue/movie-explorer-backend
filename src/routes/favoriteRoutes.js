import { Router } from "express";
import {
  getAllFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";

const router = Router();

router.get("/", getAllFavorites);
router.post("/", addFavorite);
router.delete("/:id", removeFavorite);

export default router;
