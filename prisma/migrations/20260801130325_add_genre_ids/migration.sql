-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "genreIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "History" ADD COLUMN     "genreIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable
ALTER TABLE "Watchlist" ADD COLUMN     "genreIds" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
