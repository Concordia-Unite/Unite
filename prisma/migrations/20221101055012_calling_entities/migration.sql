-- CreateEnum
CREATE TYPE "Region" AS ENUM ('Great_Lakes', 'Great_Plains', 'West_Southwest', 'East_Southwest', 'Central');

-- CreateEnum
CREATE TYPE "Variant" AS ENUM ('Recognized_Service_Organization', 'Elementary_School', 'Junior_High_School', 'Senior_High_School', 'K_12_School', 'K_8_School', 'Association_of_Schools', 'Church');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "callingEntityId" UUID;

-- CreateTable
CREATE TABLE "CallingEntity" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "region" "Region" NOT NULL,
    "variant" "Variant" NOT NULL,
    "addressId" UUID NOT NULL,
    "adminId" UUID NOT NULL,

    CONSTRAINT "CallingEntity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CallingEntity_adminId_key" ON "CallingEntity"("adminId");

-- AddForeignKey
ALTER TABLE "CallingEntity" ADD CONSTRAINT "CallingEntity_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CallingEntity" ADD CONSTRAINT "CallingEntity_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_callingEntityId_fkey" FOREIGN KEY ("callingEntityId") REFERENCES "CallingEntity"("id") ON DELETE SET NULL ON UPDATE CASCADE;
