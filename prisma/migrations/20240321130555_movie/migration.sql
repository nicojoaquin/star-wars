-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "openingCrawl" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "characters" TEXT[],
    "planets" TEXT[],
    "species" TEXT[],
    "starships" TEXT[],
    "vehicles" TEXT[],

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
