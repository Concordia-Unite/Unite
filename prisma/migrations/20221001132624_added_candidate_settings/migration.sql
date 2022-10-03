/*
  Warnings:

  - Added the required column `settingsId` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "CandidateSettings" (
    "csid" TEXT NOT NULL PRIMARY KEY,
    "showAddresses" BOOLEAN NOT NULL DEFAULT false
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "cid" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "biography" TEXT,
    "profilePictureUrl" TEXT,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isMarried" BOOLEAN NOT NULL DEFAULT true,
    "wasRostered" BOOLEAN NOT NULL DEFAULT false,
    "settingsId" TEXT NOT NULL,
    CONSTRAINT "Candidate_settingsId_fkey" FOREIGN KEY ("settingsId") REFERENCES "CandidateSettings" ("csid") ON DELETE RESTRICT ON UPDATE CASCADE
);

INSERT INTO "new_Candidate" ("cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered") SELECT "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
CREATE UNIQUE INDEX "Candidate_settingsId_key" ON "Candidate"("settingsId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
