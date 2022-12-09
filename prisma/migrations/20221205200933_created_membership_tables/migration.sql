/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "UniversityMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "universityId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "UniversityMembership_universityId_fkey" FOREIGN KEY ("universityId") REFERENCES "University" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UniversityMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DistrictMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "districtId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "DistrictMembership_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DistrictMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CallingEntityMembership" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "role" TEXT NOT NULL,
    "callingEntityId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "CallingEntityMembership_callingEntityId_fkey" FOREIGN KEY ("callingEntityId") REFERENCES "CallingEntity" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CallingEntityMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" DATETIME,
    "image" TEXT,
    "is_admin" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("email", "emailVerified", "id", "image", "name") SELECT "email", "emailVerified", "id", "image", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "UniversityMembership_userId_key" ON "UniversityMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DistrictMembership_userId_key" ON "DistrictMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CallingEntityMembership_userId_key" ON "CallingEntityMembership"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_key" ON "Candidate"("userId");
