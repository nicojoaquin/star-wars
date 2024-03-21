/*
  Warnings:

  - You are about to drop the column `apiId` on the `Movie` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Movie_apiId_key";

-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "apiId";
