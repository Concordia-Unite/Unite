/**
 * creation-form.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Membership Creation Form
 */

// Imports
import { z } from "zod";
import { Role } from "@enums/role";

export const creationFormValidator = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Role),
});

export type CreationForm = z.infer<typeof creationFormValidator>;
