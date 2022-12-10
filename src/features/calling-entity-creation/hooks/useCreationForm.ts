/**
 * useCreationForm.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Creation Form Hook
 */

// Imports
import type { CreationForm } from "../lib/creation-form";
import { createFormContext } from "@mantine/form";

/**
 * useCreationForm
 *
 * This is the hook to create the form with the predefined type.
 * This should be used for the form.
 */
export const [, , useCreationForm] = createFormContext<CreationForm>();
