-- AlterTable
ALTER TABLE "CallingEntity" ADD COLUMN     "districtId" UUID;

-- AlterTable
ALTER TABLE "Candidate" ADD COLUMN     "districtId" UUID;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "districtId" UUID;

-- CreateTable
CREATE TABLE "District" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,
    "addressId" UUID NOT NULL,
    "adminId" UUID NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "District_adminId_key" ON "District"("adminId");

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallingEntity" ADD CONSTRAINT "CallingEntity_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;
