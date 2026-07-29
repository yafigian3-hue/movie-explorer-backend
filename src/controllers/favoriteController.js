import prisma from "../lib/prisma.js";

export async function getAllFavorites(req, res) {
  try {
    const favorites = await prisma.favorite.findMany();

    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil data favorite" });
  }
}

export async function addFavorite(req, res) {
  const { id, title, image, rating, year } = req.body;

  if (!id || !title) {
    return res.status(400).json({ message: "Data film tidak lengkap" });
  }

  try {
    const newFavorite = await prisma.favorite.create({
      data: {
        id,
        title,
        image,
        rating: rating != null ? Number(rating) : null,
        year: year != null ? Number(year) : null,
      },
    });

    res.status(201).json(newFavorite);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal menambah favorite" });
  }
}

export async function removeFavorite(req, res) {
  const id = Number(req.params.id);

  try {
    const favorite = await prisma.favorite.findUnique({
      where: { id },
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Film tidak ditemukan di favorite",
      });
    }

    await prisma.favorite.delete({
      where: { id },
    });

    res.json({
      message: "Berhasil dihapus dari favorite",
      deleted: favorite,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal menghapus favorite",
    });
  }
}
