import express from "express";
import cors from "cors";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Halo, Backend Pertamaku!");
});

app.use("/favorites", favoriteRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/history", historyRoutes);

export default app;
