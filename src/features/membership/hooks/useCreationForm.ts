/**
 * useCreationForm.ts
 * Ian Kollipara
 * 2022.12.10
 *
 * Membership Creation Form Hook
 */

// Imports
import type { CreationForm } from "../lib/creation-form";
import { createFormContext } from "@mantine/form";

export const [, , useCreationForm] = createFormContext<CreationForm>();
