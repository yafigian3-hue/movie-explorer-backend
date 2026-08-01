import express from "express";
import cors from "cors";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Halo, Backend Pertamaku!");
});

app.use("/favorites", favoriteRoutes);
app.use("/watchlist", watchlistRoutes);
app.use("/history", historyRoutes);

export default app;
