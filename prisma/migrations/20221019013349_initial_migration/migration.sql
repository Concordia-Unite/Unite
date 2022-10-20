-- CreateEnum
CREATE TYPE "StateCode" AS ENUM ('NE', 'AL', 'KY', 'OH', 'AK', 'LA', 'OK', 'AZ', 'ME', 'OR', 'AR', 'MD', 'PA', 'MA', 'CA', 'MI', 'RI', 'CO', 'MN', 'SC', 'CT', 'MS', 'SD', 'DE', 'MO', 'TN', 'DC', 'MT', 'TX', 'FL', 'GA', 'NV', 'UT', 'NH', 'VT', 'HI', 'NJ', 'VA', 'ID', 'NM', 'IL', 'NY', 'WA', 'IN', 'NC', 'WV', 'IA', 'ND', 'WI', 'KS', 'WY');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('GreatLakes', 'GreatPlains', 'WestSouthwest', 'EastSouthwest', 'Central');

-- CreateEnum
CREATE TYPE "Position" AS ENUM ('Deaconess', 'DirectorOfChristianEducation', 'DirectorOfChristianOutreach', 'DirectorOfChurchMinistries', 'DirectorOfFamilyLifeMinistries', 'DirectorOfParishMusic', 'EarlyChildhoodLutheranTeacher', 'ElementaryLutheranTeacher', 'MiddleLutheranTeacher', 'SecondaryLutheranTeacher', 'K12LutheranTeacher', 'K8LutheranTeacher', 'SpecialEducationLutheranTeacher');

-- CreateEnum
CREATE TYPE "ClassroomType" AS ENUM ('Deparmentalized', 'SelfContained', 'SelfContainedMultiGrade');

-- CreateEnum
CREATE TYPE "MaritialStatus" AS ENUM ('Married', 'Single', 'Engaged');

-- CreateEnum
CREATE TYPE "SocialSecurityContribution" AS ENUM ('EmployerPaysAll', 'EmployerPaysPart', 'WorkPaysAll', 'Other');

-- CreateEnum
CREATE TYPE "HousingAllowance" AS ENUM ('ResidenceProvided', 'SalaryOnly', 'SalaryPlusHousingStipend');

-- CreateEnum
CREATE TYPE "HealthCoverage" AS ENUM ('Family', 'WorkerOnly', 'WorkerAndChildren');

-- CreateEnum
CREATE TYPE "HealthPlan" AS ENUM ('ConcordiaPlan', 'None', 'Other');

-- CreateEnum
CREATE TYPE "OrganizationType" AS ENUM ('RecognizedServiceOrganization', 'School', 'ClassicalSchool', 'Church', 'Association');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('Pending', 'Approved', 'Cancelled', 'Fulfilled');

-- CreateEnum
CREATE TYPE "Subject" AS ENUM ('Math', 'Science', 'SocialStudies', 'English', 'SpecialEducation', 'PE', 'Technology', 'History', 'Religion', 'HomeEc', 'Band', 'Choir', 'Other');

-- CreateEnum
CREATE TYPE "CallStatus" AS ENUM ('Pending', 'WithOrganization', 'Declined', 'Extended', 'Accepted');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "expiresAt" INTEGER,
    "tokenType" TEXT,
    "scope" TEXT,
    "idToken" TEXT,
    "sessionState" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Candidate" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(255) NOT NULL DEFAULT '',
    "lastName" VARCHAR(255) NOT NULL DEFAULT '',
    "biography" TEXT NOT NULL DEFAULT '',
    "profilePictureUrl" VARCHAR(255) NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phoneNumber" VARCHAR(17) NOT NULL DEFAULT '+1 (000) 000-0000',
    "maritialStatus" "MaritialStatus" NOT NULL DEFAULT 'Single',
    "isRostered" BOOLEAN NOT NULL DEFAULT false,
    "showPhoneNumber" BOOLEAN NOT NULL DEFAULT false,
    "showAddress" BOOLEAN NOT NULL DEFAULT false,
    "placementOffice" UUID NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Candidate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateAddress" (
    "id" UUID NOT NULL,
    "candidateId" UUID NOT NULL,
    "addressId" UUID NOT NULL,

    CONSTRAINT "CandidateAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" UUID NOT NULL,
    "houseNumber" TEXT NOT NULL DEFAULT '',
    "street" TEXT NOT NULL DEFAULT '',
    "state" "StateCode" NOT NULL DEFAULT 'NE',
    "zipCode" VARCHAR(5) NOT NULL DEFAULT '68434',
    "country" VARCHAR(3) NOT NULL DEFAULT 'US',

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "addressId" UUID NOT NULL,
    "website" TEXT NOT NULL DEFAULT '',
    "InstitutionPositions" "Position"[],

    CONSTRAINT "Institution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" UUID NOT NULL,
    "institutionId" UUID,
    "districtId" UUID,
    "organizationId" UUID,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "region" "Region" NOT NULL,
    "addressId" UUID NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "region" "Region" NOT NULL,
    "type" "OrganizationType" NOT NULL,
    "districtId" UUID NOT NULL,
    "addressId" UUID NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlacementDirector" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "districtId" UUID,
    "institutionId" UUID,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PlacementDirector_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Education" (
    "id" UUID NOT NULL,
    "degree" TEXT NOT NULL DEFAULT 'B.S. Education',
    "graduationDate" TIMESTAMP(3),
    "isGraduated" BOOLEAN NOT NULL DEFAULT false,
    "candidateId" UUID NOT NULL,
    "institutionId" UUID NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Job" (
    "id" UUID NOT NULL,
    "position" "Position" NOT NULL,
    "organizationId" UUID NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'Pending',
    "classroom" "ClassroomType" NOT NULL DEFAULT 'Deparmentalized',
    "grade" VARCHAR(2) NOT NULL DEFAULT 'K',
    "subjects" "Subject"[],
    "description" TEXT NOT NULL DEFAULT '',
    "startDate" TIMESTAMP(3),
    "isTenured" BOOLEAN,
    "isFullTime" BOOLEAN,
    "salary" MONEY NOT NULL,
    "socialSecurityContrib" "SocialSecurityContribution" NOT NULL,
    "housingAllowance" "HousingAllowance",
    "healthCoverage" "HealthCoverage",
    "healthPlan" "HealthPlan",
    "monthsOfService" SMALLINT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Call" (
    "id" UUID NOT NULL,
    "jobId" UUID NOT NULL,
    "candidateId" UUID NOT NULL,
    "status" "CallStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_userId_key" ON "Candidate"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_addressId_key" ON "Institution"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_userId_key" ON "Admin"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "District_addressId_key" ON "District"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_districtId_key" ON "Organization"("districtId");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_addressId_key" ON "Organization"("addressId");

-- CreateIndex
CREATE UNIQUE INDEX "PlacementDirector_userId_key" ON "PlacementDirector"("userId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidate" ADD CONSTRAINT "Candidate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateAddress" ADD CONSTRAINT "CandidateAddress_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateAddress" ADD CONSTRAINT "CandidateAddress_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementDirector" ADD CONSTRAINT "PlacementDirector_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementDirector" ADD CONSTRAINT "PlacementDirector_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlacementDirector" ADD CONSTRAINT "PlacementDirector_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_institutionId_fkey" FOREIGN KEY ("institutionId") REFERENCES "Institution"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
