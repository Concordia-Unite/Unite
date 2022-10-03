-- RedefineTables
PRAGMA foreign_keys=OFF;
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
    "showAddress" BOOLEAN NOT NULL,
    "isGraduated" BOOLEAN NOT NULL,
    "degree" TEXT NOT NULL,
    "certification" TEXT NOT NULL DEFAULT '',
    "graduationDate" DATETIME
);
INSERT INTO "new_Candidate" ("biography", "certification", "cid", "degree", "email", "firstName", "graduationDate", "isGraduated", "isMarried", "lastName", "phoneNumber", "profilePictureUrl", "showAddress", "wasRostered") SELECT coalesce("biography", '') AS "biography", "certification", "cid", "degree", "email", "firstName", "graduationDate", "isGraduated", "isMarried", "lastName", "phoneNumber", coalesce("profilePictureUrl", '') AS "profilePictureUrl", "showAddress", "wasRostered" FROM "Candidate";
DROP TABLE "Candidate";
ALTER TABLE "new_Candidate" RENAME TO "Candidate";
CREATE UNIQUE INDEX "Candidate_email_key" ON "Candidate"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
