/**
 * creation-form.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Creation Form
 */

// Imports
import { z } from "zod";

/**
 * creationFormValidator
 *
 * This validates the candidate creation input through
 * a zod validator. The type of the form is derived from this.
 */
export const creationFormValidator = z.object({
  wasRostered: z.boolean(),
  universityId: z.number(),
  districtId: z.number(),
  name: z.string(),
  profilePictureUrl: z.string().default(""),
});

/**
 * CreationForm
 *
 * The type of the form for Candidate Creation.
 * Derived from the Zod Validator.
 */
export type CreationForm = z.infer<typeof creationFormValidator>;
