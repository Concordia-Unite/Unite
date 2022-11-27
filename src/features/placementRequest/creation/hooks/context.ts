import { createFormContext } from "@mantine/form";
import type { FormValues } from "@features/placementRequest/creation/lib/form";

export const [FormProvider, useFormContext, useForm] =
  createFormContext<FormValues>();
