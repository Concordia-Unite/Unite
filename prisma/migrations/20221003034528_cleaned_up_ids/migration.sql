/*
  Warnings:

  - The primary key for the `CandidateAddress` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `caid` on the `CandidateAddress` table. All the data in the column will be lost.
  - You are about to drop the column `candidate_id` on the `CandidateAddress` table. All the data in the column will be lost.
  - You are about to drop the column `certification` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `degree` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `graduationDate` on the `Candidate` table. All the data in the column will be lost.
  - You are about to drop the column `isGraduated` on the `Candidate` table. All the data in the column will be lost.
  - The primary key for the `CandidateEducation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ceid` on the `CandidateEducation` table. All the data in the column will be lost.
  - Added the required column `candidateId` to the `CandidateAddress` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CandidateAddress" (
    "houseNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    PRIMARY KEY ("houseNumber", "street", "state", "zipCode", "country", "candidateId"),
    CONSTRAINT "CandidateAddress_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("cid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_CandidateAddress" ("country", "houseNumber", "state", "street", "zipCode") SELECT "country", "houseNumber", "state", "street", "zipCode" FROM "CandidateAddress";
DROP TABLE "CandidateAddress";
ALTER TABLE "new_CandidateAddress" RENAME TO "CandidateAddress";
CREATE TABLE "new_Candidate" (
    "cid" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "biography" TEXT NOT NULL DEFAULT '',
    "profilePictureUrl" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isMarried" BOOLEAN NOT NULL DEFAULT true,
    "wasRostered" BOOLEAN NOT NULL DEFAULT false,
    "showAddress" BOOLEAN NOT NULL
);
INSERT INTO "new_Candidate" ("biography", "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "profilePictureUrl", "showAddress", "wasRostered") SELECT "biography", "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "profilePictureUrl", "showAddress", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
CREATE TABLE "new_CandidateEducation" (
    "degree" TEXT NOT NULL,
    "isGraduated" BOOLEAN NOT NULL,
    "graduationDate" DATETIME,
    "schoolId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,

    PRIMARY KEY ("candidateId", "schoolId", "isGraduated"),
    CONSTRAINT "CandidateEducation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("sid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CandidateEducation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("cid") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_CandidateEducation" ("candidateId", "degree", "graduationDate", "isGraduated", "schoolId") SELECT "candidateId", "degree", "graduationDate", "isGraduated", "schoolId" FROM "CandidateEducation";
DROP TABLE "CandidateEducation";
ALTER TABLE "new_CandidateEducation" RENAME TO "CandidateEducation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
