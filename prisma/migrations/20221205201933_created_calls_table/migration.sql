-- CreateTable
CREATE TABLE "Call" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "placementRequestId" INTEGER NOT NULL,
    CONSTRAINT "Call_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Call_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
