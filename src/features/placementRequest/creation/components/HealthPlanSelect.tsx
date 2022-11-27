import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { HealthPlan } from "@prisma/client";

interface HealthPlanSelectProps<T> extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}
export function HealthPlanSelect<T extends { healthPlan?: HealthPlan }>({
  form,
  ...rest
}: HealthPlanSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(HealthPlan).map((healthPlan) => ({
          label: healthPlan.replaceAll("_", " "),
          value: healthPlan,
        }))}
        {...rest}
        {...form.getInputProps("healthPlan")}
      />
    </>
  );
}
