/*
  Warnings:

  - A unique constraint covering the columns `[episodeId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie_episodeId_key" ON "Movie"("episodeId");
