import { Select, SelectProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Variant } from "@prisma/client";

interface VariantSelectProps<T> extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}

export function VariantSelect<T extends { variant: Variant }>({
  form,
  ...rest
}: VariantSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(Variant).map((variant) => ({
          label: variant.replaceAll("_", " "),
          value: variant,
        }))}
        {...rest}
        {...form.getInputProps("variant")}
      />
    </>
  );
}
