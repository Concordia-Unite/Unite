-- CreateEnum
CREATE TYPE "Classroom" AS ENUM ('Deparmentalized', 'Self_Contained', 'Self_Contained_Multi_Grade');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Deaconess', 'Lutheran_Teacher', 'Director_of_Christian_Education', 'Director_of_Parish_Music', 'Director_of_Christian_Outreach', 'Director_of_Church_Ministries', 'Director_of_Family_Life_Ministries');

-- CreateEnum
CREATE TYPE "SocialSecurityContribution" AS ENUM ('Employer_Pays_All', 'Employer_Pays_Part', 'Worker_Pays_All');

-- CreateEnum
CREATE TYPE "HealthCoverage" AS ENUM ('Worker_and_Children', 'Family', 'Worker_Only');

-- CreateEnum
CREATE TYPE "HealthPlan" AS ENUM ('Concordia_Plan', 'None', 'Other');

-- CreateEnum
CREATE TYPE "HousingAllowanceType" AS ENUM ('Salary', 'Stipend', 'Provided');

-- CreateEnum
CREATE TYPE "PlacementRequestStatus" AS ENUM ('Pending', 'Approved', 'Cancelled', 'Fulfilled');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('Expressed', 'Declined', 'Extended', 'Accepted');

-- CreateTable
CREATE TABLE "PlacementRequest" (
    "id" UUID NOT NULL,
    "position" "Position" NOT NULL,
    "status" "PlacementRequestStatus" NOT NULL DEFAULT 'Pending',
    "classroom" "Classroom" NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "isTenured" BOOLEAN NOT NULL,
    "isFullTime" BOOLEAN NOT NULL,
    "salary" MONEY NOT NULL,
    "socialSecurityContribution" "SocialSecurityContribution" NOT NULL,
    "healthCoverage" "HealthCoverage",
    "healthPlan" "HealthPlan",
    "monthsOfService" SMALLINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "callingEntityId" UUID NOT NULL,
    "districtId" UUID NOT NULL,
    "housingAllowanceId" UUID NOT NULL,

    CONSTRAINT "PlacementRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" UUID NOT NULL,
    "status" "CallStatus" NOT NULL,
    "placementRequestId" UUID NOT NULL,
    "candidateId" UUID NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grade" (
    "id" UUID NOT NULL,
    "grade" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HousingAllowance" (
    "id" UUID NOT NULL,
    "type" "HousingAllowanceType" NOT NULL,
    "stipend" DECIMAL(65,30),

    CONSTRAINT "HousingAllowance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PlacementRequestToSubject" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateTable
CREATE TABLE "_GradeToPlacementRequest" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PlacementRequest_housingAllowanceId_key" ON "PlacementRequest"("housingAllowanceId");

-- CreateIndex
CREATE UNIQUE INDEX "_PlacementRequestToSubject_AB_unique" ON "_PlacementRequestToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_PlacementRequestToSubject_B_index" ON "_PlacementRequestToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GradeToPlacementRequest_AB_unique" ON "_GradeToPlacementRequest"("A", "B");

-- CreateIndex
CREATE INDEX "_GradeToPlacementRequest_B_index" ON "_GradeToPlacementRequest"("B");

-- AddForeignKey
ALTER TABLE "PlacementRequest" ADD CONSTRAINT "PlacementRequest_callingEntityId_fkey" FOREIGN KEY ("callingEntityId") REFERENCES "CallingEntity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementRequest" ADD CONSTRAINT "PlacementRequest_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementRequest" ADD CONSTRAINT "PlacementRequest_housingAllowanceId_fkey" FOREIGN KEY ("housingAllowanceId") REFERENCES "HousingAllowance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_placementRequestId_fkey" FOREIGN KEY ("placementRequestId") REFERENCES "PlacementRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlacementRequestToSubject" ADD CONSTRAINT "_PlacementRequestToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "PlacementRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlacementRequestToSubject" ADD CONSTRAINT "_PlacementRequestToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToPlacementRequest" ADD CONSTRAINT "_GradeToPlacementRequest_A_fkey" FOREIGN KEY ("A") REFERENCES "Grade"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GradeToPlacementRequest" ADD CONSTRAINT "_GradeToPlacementRequest_B_fkey" FOREIGN KEY ("B") REFERENCES "PlacementRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
