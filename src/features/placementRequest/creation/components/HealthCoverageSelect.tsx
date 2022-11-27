import type { SelectProps } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { HealthCoverage } from "@prisma/client";
import { Select } from "@mantine/core";

interface HealthCoverageSelectProps<T>
  extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}
export function HealthCoverageSelect<
  T extends { healthCoverage?: HealthCoverage }
>({ form, ...rest }: HealthCoverageSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(HealthCoverage).map((healthCoverage) => ({
          label: healthCoverage.replaceAll("_", " "),
          value: healthCoverage,
        }))}
        {...rest}
        {...form.getInputProps("healthCoverage")}
      />
    </>
  );
}
