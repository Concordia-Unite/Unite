import { Select, SelectProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface MonthsOfServiceSelectProps<T>
  extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}

export function MonthsOfServiceSelect<T extends { monthsOfService?: number }>({
  form,
  ...rest
}: MonthsOfServiceSelectProps<T>) {
  return (
    <>
      <Select
        data={[9, 10, 11, 12].map((val) => ({
          label: val.toString(),
          value: val,
        }))}
        {...rest}
        {...form.getInputProps("monthsOfService")}
      />
    </>
  );
}
