/*
  Warnings:

  - A unique constraint covering the columns `[placementRequestId]` on the table `DistrictPlacementRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `variant` to the `CallingEntity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CallingEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "variant" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    CONSTRAINT "CallingEntity_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CallingEntity" ("districtId", "id", "name") SELECT "districtId", "id", "name" FROM "CallingEntity";
DROP TABLE "CallingEntity";
ALTER TABLE "new_CallingEntity" RENAME TO "CallingEntity";
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_District" ("id", "name") SELECT "id", "name" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "DistrictPlacementRequest_placementRequestId_key" ON "DistrictPlacementRequest"("placementRequestId");
