/*
  Warnings:

  - A unique constraint covering the columns `[apiId]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `apiId` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "apiId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Movie_apiId_key" ON "Movie"("apiId");
