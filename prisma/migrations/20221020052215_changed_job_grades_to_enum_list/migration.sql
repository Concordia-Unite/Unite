/*
  Warnings:

  - You are about to drop the column `grade` on the `Job` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('Kindergarten', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Nineth', 'Tenth', 'Eleventh', 'Twelfth');

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "grade",
ADD COLUMN     "grades" "Grade"[];
