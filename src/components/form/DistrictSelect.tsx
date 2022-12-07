import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { District } from "@prisma/client";

interface Props<T> extends Omit<SelectProps, "form" | "data" | "label"> {
  data: T[];
}

export function DistrictSelect<T extends District>({
  data,
  ...rest
}: Props<T>) {
  return (
    <>
      <Select
        label="Select A District"
        data={data.map((district) => ({
          label: district.name,
          value: district.id.toString(),
        }))}
        {...rest}
      />
    </>
  );
}
