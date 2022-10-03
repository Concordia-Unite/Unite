/*
  Warnings:

  - Added the required column `user_id` to the `Candidate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Address" (
    "aid" TEXT NOT NULL PRIMARY KEY,
    "houseNumber" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "candidate_id" TEXT NOT NULL,
    CONSTRAINT "Address_candidate_id_fkey" FOREIGN KEY ("candidate_id") REFERENCES "Candidate" ("cid") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Address" ("aid", "candidate_id", "country", "houseNumber", "state", "street", "zipCode") SELECT "aid", "candidate_id", "country", "houseNumber", "state", "street", "zipCode" FROM "Address";
DROP TABLE "Address";
ALTER TABLE "new_Address" RENAME TO "Address";
CREATE TABLE "new_Candidate" (
    "cid" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isMarried" BOOLEAN NOT NULL DEFAULT true,
    "wasRostered" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Candidate_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Candidate" ("cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered") SELECT "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
CREATE UNIQUE INDEX "Candidate_user_id_key" ON "Candidate"("user_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
