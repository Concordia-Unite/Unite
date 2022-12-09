import { createFormContext } from "@mantine/form";
import type { UpdateForm } from "../lib/update-form";

export const [, , useUpdateForm] = createFormContext<UpdateForm>();
