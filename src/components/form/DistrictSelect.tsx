/**
 * DistrictSelect.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * District Form Select
 */

// Imports
import type { SelectProps } from "@mantine/core";
import type { District } from "@prisma/client";
import { Select } from "@mantine/core";

interface Props<T> extends Omit<SelectProps, "form" | "data" | "label"> {
  data: T[];
}

/**
 * ### District Form Select
 *
 * Display a Single Select used for selecting districts.
 * Often used with `useDistricts` hook.
 */
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
