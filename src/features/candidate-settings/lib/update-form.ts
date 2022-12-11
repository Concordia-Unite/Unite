/**
 * update-form.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Settings Update Form
 */

// Imports
import { z } from "zod";

/**
 * updateFormValidator
 *
 * Zod Validator for Settings Update
 */
export const updateFormValidator = z.object({
  wasRostered: z.boolean(),
  universityId: z.number(),
  districtId: z.number(),
  name: z.string(),
  profilePictureUrl: z.string(),
});

export type UpdateForm = z.infer<typeof updateFormValidator>;
