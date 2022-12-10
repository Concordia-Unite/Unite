/**
 * UniversitySelect.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * University Form Select
 */

// Imports
import type { SelectProps } from "@mantine/core";
import type { University } from "@prisma/client";
import { Select } from "@mantine/core";

interface Props<T> extends Omit<SelectProps, "data" | "form" | "label"> {
  data: T[];
}

/**
 * ### University Form Select
 *
 * Display a Single Select used for selecting universities.
 * Often used with `useUniversity` hook.
 */
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
