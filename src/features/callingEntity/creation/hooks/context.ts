import { createFormContext } from "@mantine/form";
import type { FormValues } from "@features/callingEntity/creation/lib/form";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FormValues>();
