/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address_id` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `biography` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_rostered` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture_url` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StateCode" AS ENUM ('NE', 'AL', 'KY', 'OH', 'AK', 'LA', 'OK', 'AZ', 'ME', 'OR', 'AR', 'MD', 'PA', 'MA', 'CA', 'MI', 'RI', 'CO', 'MN', 'SC', 'CT', 'MS', 'SD', 'DE', 'MO', 'TN', 'DC', 'MT', 'TX', 'FL', 'GA', 'NV', 'UT', 'NH', 'VT', 'HI', 'NJ', 'VA', 'ID', 'NM', 'IL', 'NY', 'WA', 'IN', 'NC', 'WV', 'IA', 'ND', 'WI', 'KS', 'WY');

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "address_id" UUID NOT NULL,
ADD COLUMN     "biography" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "is_rostered" BOOLEAN NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "profile_picture_url" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "house_number" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" "StateCode" NOT NULL,
    "country" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_key" ON "Candidate"("userId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
