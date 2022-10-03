/*
  Warnings:

  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CandidateSettings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `settingsId` on the `Candidate` table. All the data in the column will be lost.
  - Added the required column `degree` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isGraduated` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `showAddress` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Address";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CandidateSettings";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "School" (
    "sid" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CandidateEducation" (
    "ceid" TEXT NOT NULL PRIMARY KEY,
    "degree" TEXT NOT NULL,
    "isGraduated" BOOLEAN NOT NULL,
    "graduationDate" DATETIME,
    "schoolId" TEXT NOT NULL,
    "candidateId" TEXT NOT NULL,
    CONSTRAINT "CandidateEducation_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "School" ("sid") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CandidateEducation_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate" ("cid") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CandidateAddress" (
    "caid" TEXT NOT NULL PRIMARY KEY,
    "houseNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    CONSTRAINT "CandidateAddress_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate" ("cid") ON DELETE CASCADE ON UPDATE CASCADE
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
    "showAddress" BOOLEAN NOT NULL,
    "isGraduated" BOOLEAN NOT NULL,
    "degree" TEXT NOT NULL,
    "certification" TEXT NOT NULL DEFAULT '',
    "graduationDate" DATETIME
);
INSERT INTO "new_Candidate" ("biography", "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "profilePictureUrl", "wasRostered") SELECT "biography", "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "profilePictureUrl", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "CandidateEducation_schoolId_key" ON "CandidateEducation"("schoolId");
