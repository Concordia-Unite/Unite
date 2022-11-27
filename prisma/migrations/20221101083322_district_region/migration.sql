/*
  Warnings:

  - Added the required column `region` to the `District` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "District" ADD COLUMN     "region" "Region" NOT NULL;
