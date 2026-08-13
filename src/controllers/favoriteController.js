import prisma from "../lib/prisma.js";

export async function getAllFavorites(req, res) {
  try {
    const favorites = await prisma.favorite.findMany({
      where: {
        userId: req.user.userId,
      },
    });

    res.json(favorites);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil data favorite",
    });
  }
}

export async function addFavorite(req, res) {
  const { id, title, image, rating, year, genreIds } = req.body;

  if (!id || !title) {
    return res.status(400).json({
      message: "Data film tidak lengkap",
    });
  }

  try {
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.userId,
          movieId: id,
        },
      },
    });

    if (existingFavorite) {
      return res.status(409).json({
        message: "Film sudah ada di favorite",
      });
    }

    const newFavorite = await prisma.favorite.create({
      data: {
        movieId: id,
        title,
        image,
        rating: rating != null ? Number(rating) : null,
        year: year != null ? Number(year) : null,
        genreIds: Array.isArray(genreIds) ? genreIds : [],
        userId: req.user.userId,
      },
    });

    res.status(201).json(newFavorite);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menambah favorite",
    });
  }
}

export async function removeFavorite(req, res) {
  const movieId = Number(req.params.id);

  try {
    const favorite = await prisma.favorite.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.userId,
          movieId,
        },
      },
    });

    if (!favorite) {
      return res.status(404).json({
        message: "Film tidak ditemukan di favorite",
      });
    }

    await prisma.favorite.delete({
      where: {
        userId_movieId: {
          userId: req.user.userId,
          movieId,
        },
      },
    });

    res.json({
      message: "Berhasil dihapus dari favorite",
      deleted: favorite,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal menghapus favorite",
    });
  }
}
