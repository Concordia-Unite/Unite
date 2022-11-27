import type { NumberInputProps } from "@mantine/core";
import { NumberInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconCurrencyDollar } from "@tabler/icons";

interface SalaryInputProps<T>
  extends Omit<
    NumberInputProps,
    "data" | "form" | "icon" | "min" | "precision" | "type"
  > {
  form: UseFormReturnType<T>;
}
export function SalaryInput<T extends { salary: number }>({
  form,
  ...rest
}: SalaryInputProps<T>) {
  return (
    <>
      <NumberInput
        icon={<IconCurrencyDollar />}
        type={"number"}
        precision={0}
        {...form.getInputProps("salary")}
        {...rest}
      />
    </>
  );
}
