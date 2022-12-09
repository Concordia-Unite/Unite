-- CreateTable
CREATE TABLE "UniversityPlacementRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "placementRequestId" INTEGER NOT NULL,
    CONSTRAINT "UniversityPlacementRequest_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UniversityPlacementRequest_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DistrictPlacementRequest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "placementRequestId" INTEGER NOT NULL,
    CONSTRAINT "DistrictPlacementRequest_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DistrictPlacementRequest_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
