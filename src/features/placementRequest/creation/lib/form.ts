import type {
  Classroom,
  HealthCoverage,
  HealthPlan,
  HousingAllowanceType,
  Position,
  SocialSecurityContribution,
} from "@prisma/client";

export interface FormValues {
  position: Position;
  classroom: Classroom;
  gradeIds: string[];
  subjectIds: string[];
  description: string;
  startDate: Date;
  isTenured: boolean;
  isFullTime: boolean;
  salary: number;
  socialSecurityContribution: SocialSecurityContribution;
  healthCoverage?: HealthCoverage;
  healthPlan?: HealthPlan;
  universityIds: string[];
  monthsOfService?: number;
  housingAllowance: {
    type: HousingAllowanceType;
    stipend?: number;
  };
}
