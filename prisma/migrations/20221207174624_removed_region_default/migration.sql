-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_District" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "region" TEXT NOT NULL
);
INSERT INTO "new_District" ("id", "name", "region") SELECT "id", "name", "region" FROM "District";
DROP TABLE "District";
ALTER TABLE "new_District" RENAME TO "District";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
