/*
  Warnings:

  - Added the required column `type` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `PlacementDirector` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AdminType" AS ENUM ('Organization', 'Institution', 'District');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Candidate', 'Admin', 'PlacementDirector', 'Unknown');

-- CreateEnum
CREATE TYPE "PlacementDirectorType" AS ENUM ('District', 'Institution');

-- AlterTable
ALTER TABLE "Admin" ADD COLUMN     "type" "AdminType" NOT NULL;

-- AlterTable
ALTER TABLE "PlacementDirector" ADD COLUMN     "type" "PlacementDirectorType" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'Unknown';
