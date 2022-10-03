/*
  Warnings:

  - You are about to drop the column `user_id` on the `Candidate` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Candidate" (
    "cid" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "isMarried" BOOLEAN NOT NULL DEFAULT true,
    "wasRostered" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Candidate" ("cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered") SELECT "cid", "email", "firstName", "isMarried", "lastName", "phoneNumber", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
