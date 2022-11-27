/*
  Warnings:

  - The values [Deparmentalized] on the enum `Classroom` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Classroom_new" AS ENUM ('Departmentalized', 'Self_Contained', 'Self_Contained_Multi_Grade');
ALTER TABLE "PlacementRequest" ALTER COLUMN "classroom" TYPE "Classroom_new" USING ("classroom"::text::"Classroom_new");
ALTER TYPE "Classroom" RENAME TO "Classroom_old";
ALTER TYPE "Classroom_new" RENAME TO "Classroom";
DROP TYPE "Classroom_old";
COMMIT;
