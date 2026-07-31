-- CreateTable
CREATE TABLE "History" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "rating" DOUBLE PRECISION,
    "year" INTEGER,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
