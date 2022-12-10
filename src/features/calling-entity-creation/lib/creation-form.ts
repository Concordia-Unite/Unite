/**
 * creation-form.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Calling Entity Creation Form
 */

// Imports
import { z } from "zod";
import { Variant } from "@enums/variant";

/**
 * creationFormValidator
 *
 * This validates the given form. The form is
 * actually derived from this zod validator.
 * Type-safety at its best.
 */
export const creationFormValidator = z.object({
  name: z.string(),
  districtId: z.number(),
  variant: z.nativeEnum(Variant),
});

/**
 * CreationForm
 *
 * The type of the creation form, derived from the
 * validator
 */
export type CreationForm = z.infer<typeof creationFormValidator>;
