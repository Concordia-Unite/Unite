/*
  Warnings:

  - The primary key for the `CandidateAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_School" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "houseNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL
);
INSERT INTO "new_School" ("country", "houseNumber", "name", "sid", "state", "street", "zipCode") SELECT "country", "houseNumber", "name", "sid", "state", "street", "zipCode" FROM "School";
DROP TABLE "School";
ALTER TABLE "new_School" RENAME TO "School";
CREATE TABLE "new_CandidateAddress" (
    "houseNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    PRIMARY KEY ("houseNumber", "street", "state", "zipCode", "country", "candidateId"),
    CONSTRAINT "CandidateAddress_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("cid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CandidateAddress" ("candidateId", "country", "houseNumber", "state", "street", "zipCode") SELECT "candidateId", "country", "houseNumber", "state", "street", "zipCode" FROM "CandidateAddress";
DROP TABLE "CandidateAddress";
ALTER TABLE "new_CandidateAddress" RENAME TO "CandidateAddress";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
