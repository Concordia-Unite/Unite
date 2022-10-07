/**
 * candidate-form.ts
 * Ian Kollipara
 * 2022.10.06
 * 
 * Candidate Form Type
 */

export type CandidateRegistrationForm = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    isMarried: boolean;
    wasRostered: boolean;
    addressHouseNumber: string;
    addressStreet: string;
    addressState: string;
    addressZipCode: string;
    addressCountry: string;
    educationDegree: string;
    educationIsGraduated: boolean;
    educationGraduationDate: Date | null;
    educationAt: string;
  }