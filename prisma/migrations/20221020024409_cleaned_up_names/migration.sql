/*
  Warnings:

  - You are about to drop the column `InstitutionPositions` on the `Institution` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Institution" DROP COLUMN "InstitutionPositions",
ADD COLUMN     "positions" "Position"[];
