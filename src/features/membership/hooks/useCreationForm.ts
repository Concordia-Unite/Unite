import type { CreationForm } from "../lib/creation-form";
import { createFormContext } from "@mantine/form";

export const [, , useCreationForm] = createFormContext<CreationForm>();
