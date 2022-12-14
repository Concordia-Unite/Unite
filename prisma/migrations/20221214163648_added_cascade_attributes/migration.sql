-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UniversityPlacementRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "placementRequestId" INTEGER NOT NULL,
    CONSTRAINT "UniversityPlacementRequest_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UniversityPlacementRequest_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UniversityPlacementRequest" ("id", "placementRequestId", "status", "universityId") SELECT "id", "placementRequestId", "status", "universityId" FROM "UniversityPlacementRequest";
DROP TABLE "UniversityPlacementRequest";
ALTER TABLE "new_UniversityPlacementRequest" RENAME TO "UniversityPlacementRequest";
CREATE TABLE "new_DistrictPlacementRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "placementRequestId" INTEGER NOT NULL,
    CONSTRAINT "DistrictPlacementRequest_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DistrictPlacementRequest_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_DistrictPlacementRequest" ("districtId", "id", "placementRequestId", "status") SELECT "districtId", "id", "placementRequestId", "status" FROM "DistrictPlacementRequest";
DROP TABLE "DistrictPlacementRequest";
ALTER TABLE "new_DistrictPlacementRequest" RENAME TO "DistrictPlacementRequest";
CREATE UNIQUE INDEX "DistrictPlacementRequest_placementRequestId_key" ON "DistrictPlacementRequest"("placementRequestId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
