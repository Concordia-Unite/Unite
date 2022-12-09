import { Grade } from "@enums/grade";
import { HealthCoverage } from "@enums/health-coverage";
import { HealthPlan } from "@enums/health-plan";
import { HousingAllowanceVariant } from "@enums/housing-allowance-variant";
import { Position } from "@enums/position";
import { SocialSecurityContribution } from "@enums/social-security-contribution";
import { z } from "zod";

export const creationFormValidator = z.object({
  position: z.nativeEnum(Position),
  grades: z.nativeEnum(Grade).array(),
  description: z.string(),
  subject: z.string(),
  callingEntityId: z.number(),
  healthCoverage: z.nativeEnum(HealthCoverage).nullish(),
  healthPlan: z.nativeEnum(HealthPlan).nullish(),
  housingAllowance: z.object({
    type: z.nativeEnum(HousingAllowanceVariant),
    stipend: z.number().nullish(),
  }),
  isTenured: z.boolean(),
  isFullTime: z.boolean(),
  socialSecurityContribution: z.nativeEnum(SocialSecurityContribution),
  universities: z.number().array(),
  monthsOfService: z.number().nullish(),
  salary: z.number(),
  startDate: z.date().nullish(),
});

export type CreationForm = z.infer<typeof creationFormValidator>;
