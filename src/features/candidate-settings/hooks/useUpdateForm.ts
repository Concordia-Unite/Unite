/**
 * useUpdateForm.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Settings Update Form Hook
 */

// Imports
import type { UpdateForm } from "../lib/update-form";
import { createFormContext } from "@mantine/form";

export const [, , useUpdateForm] = createFormContext<UpdateForm>();
