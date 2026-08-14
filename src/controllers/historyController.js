import prisma from "../lib/prisma.js";

export async function getAllHistory(req, res) {
  try {
    const history = await prisma.history.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        viewedAt: "desc",
      },
    });

    res.json(history);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Gagal mengambil history",
    });
  }
}

export async function addHistory(req, res) {
  const { id, title, image, rating, year, genreIds } = req.body;

  if (!id || !title) {
    return res.status(400).json({
      message: "Data film tidak lengkap",
    });
  }

  try {
    const existingMovie = await prisma.history.findUnique({
      where: {
        userId_movieId: {
          userId: req.user.userId,
          movieId: id,
        },
      },
    });

    if (existingMovie) {
      const updatedHistory = await prisma.history.update({
        where: {
          userId_movieId: {
            userId: req.user.userId,
            movieId: id,
          },
        },
        data: {
          viewedAt: new Date(),
        },
      });

      return res.json(updatedHistory);
    }

    const createdHistory = await prisma.history.create({
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

    return res.status(201).json(createdHistory);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
}

export async function deleteAllHistory(req, res) {
  try {
    await prisma.history.deleteMany({
      where: {
        userId: req.user.userId,
      },
    });

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
}
