import prisma from "../lib/prisma.js";

export async function getAllWatchlists(req, res) {
  try {
    const watchlists = await prisma.watchlist.findMany();

    res.json(watchlists);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data watchlist" });
  }
}

export async function addWatchlist(req, res) {
  const { id, title, image, rating, year, genreIds } = req.body;

  if (!id || !title) {
    return res.status(400).json({ message: "Data film tidak lengkap" });
  }

  try {
    const newWatchlist = await prisma.watchlist.create({
      data: {
        id,
        title,
        image,
        rating: rating != null ? Number(rating) : null,
        year: year != null ? Number(year) : null,
        genreIds: Array.isArray(genreIds) ? genreIds : [],
      },
    });

    res.status(201).json(newWatchlist);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menambah watchlist",
    });
  }
}

export async function removeWatchlist(req, res) {
  const id = Number(req.params.id);

  try {
    const watchlist = await prisma.watchlist.findUnique({
      where: { id },
    });

    if (!watchlist) {
      return res.status(404).json({
        message: "Film tidak ditemukan di watchlist",
      });
    }

    await prisma.watchlist.delete({
      where: { id },
    });

    res.json({
      message: "Berhasil dihapus dari watchlist",
      deleted: watchlist,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus watchlist",
    });
  }
}
