/*
  Warnings:

  - You are about to drop the column `characters` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `planets` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `species` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `starships` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `vehicles` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "characters",
DROP COLUMN "planets",
DROP COLUMN "species",
DROP COLUMN "starships",
DROP COLUMN "url",
DROP COLUMN "vehicles";
