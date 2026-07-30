-- CreateTable
CREATE TABLE "Watchlist" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "rating" DOUBLE PRECISION,
    "year" INTEGER,

    CONSTRAINT "Watchlist_pkey" PRIMARY KEY ("id")
);
