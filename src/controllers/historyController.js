import prisma from "../lib/prisma.js";

export async function getAllHistory(req, res) {
  try {
    const history = await prisma.history.findMany({
      orderBy: {
        viewedAt: "desc",
      },
    });

    res.json(history);
  } catch (error) {
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
      where: { id },
    });

    if (existingMovie) {
      const updatedHistory = await prisma.history.update({
        where: { id },
        data: {
          viewedAt: new Date(),
        },
      });

      return res.json(updatedHistory);
    }

    const createdHistory = await prisma.history.create({
      data: {
        id,
        title,
        image,
        rating: rating != null ? Number(rating) : null,
        year: year != null ? Number(year) : null,
        genreIds: Array.isArray(genreIds) ? genreIds : [],
      },
    });

    return res.json(createdHistory);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Terjadi kesalahan pada server",
    });
  }
}

  export async function deleteAllHistory(req, res) {
    try {
      await prisma.history.deleteMany();

      return res.status(204).send();
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Terjadi kesalahan pada server",
      });
    }
  }
