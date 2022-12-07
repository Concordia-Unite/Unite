import { createFormContext } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";

export const [, , useCreationForm] = createFormContext<CreationForm>();
