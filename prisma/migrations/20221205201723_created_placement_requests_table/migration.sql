/*
  Warnings:

  - Added the required column `districtId` to the `CallingEntity` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PlacementRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "callingEntityId" INTEGER NOT NULL,
    "positionPosition" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isTenured" BOOLEAN NOT NULL,
    "isFullTime" BOOLEAN NOT NULL,
    "salary" DECIMAL NOT NULL,
    "socialSecurityContribution" TEXT NOT NULL,
    "healthCoverage" TEXT,
    "healthPlan" TEXT,
    "monthsOfService" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "housingAllowanceId" INTEGER NOT NULL,
    CONSTRAINT "PlacementRequest_callingEntityId_fkey" FOREIGN KEY ("callingEntityId") REFERENCES "CallingEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlacementRequest_positionPosition_fkey" FOREIGN KEY ("positionPosition") REFERENCES "Position" ("position") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlacementRequest_housingAllowanceId_fkey" FOREIGN KEY ("housingAllowanceId") REFERENCES "HousingAllowance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Grade" (
    "grade" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "HousingAllowance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "stipend" DECIMAL
);

-- CreateTable
CREATE TABLE "_GradeToPlacementRequest" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GradeToPlacementRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Grade" ("grade") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GradeToPlacementRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "PlacementRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CallingEntity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    CONSTRAINT "CallingEntity_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CallingEntity" ("id", "name") SELECT "id", "name" FROM "CallingEntity";
DROP TABLE "CallingEntity";
ALTER TABLE "new_CallingEntity" RENAME TO "CallingEntity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "PlacementRequest_housingAllowanceId_key" ON "PlacementRequest"("housingAllowanceId");

-- CreateIndex
CREATE UNIQUE INDEX "Grade_grade_key" ON "Grade"("grade");

-- CreateIndex
CREATE UNIQUE INDEX "_GradeToPlacementRequest_AB_unique" ON "_GradeToPlacementRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_GradeToPlacementRequest_B_index" ON "_GradeToPlacementRequest"("B");
