import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { University } from "@prisma/client";

interface Props<T> extends Omit<SelectProps, "data" | "form" | "label"> {
  data: T[];
}

export function UniversitySelect<T extends University>({
  data,
  ...rest
}: Props<T>) {
  return (
    <>
      <Select
        label="Select a University"
        data={data.map((uni) => ({
          label: uni.name,
          value: uni.id.toString(),
        }))}
        {...rest}
      />
    </>
  );
}
