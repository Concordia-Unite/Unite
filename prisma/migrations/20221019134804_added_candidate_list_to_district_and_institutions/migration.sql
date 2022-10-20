/*
  Warnings:

  - You are about to drop the column `placementOffice` on the `Candidate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "placementOffice",
ADD COLUMN     "districtId" UUID,
ADD COLUMN     "institutionId" UUID;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;
