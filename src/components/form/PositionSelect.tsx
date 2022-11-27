import type { SelectProps } from "@mantine/core";
import { Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { Position } from "@prisma/client";

interface PositionSelectProps<T> extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}

export function PositionSelect<T extends { position: Position }>({
  form,
  ...rest
}: PositionSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(Position).map((position) => ({
          label: position.replaceAll("_", " "),
          value: position,
        }))}
        {...rest}
        {...form.getInputProps("positions")}
      />
    </>
  );
}
