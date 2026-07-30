import express from "express";
import cors from "cors";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Halo, Backend Pertamaku!");
});

app.use("/favorites", favoriteRoutes);
app.use("/watchlist", watchlistRoutes);

export default app;
