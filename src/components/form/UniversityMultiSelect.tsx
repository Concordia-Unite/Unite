import type { MultiSelectProps } from "@mantine/core";
import { MultiSelect } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";

interface UniversityMultiSelectProps<T, Y>
  extends Omit<MultiSelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
  universities: Y[];
}

export function UniversityMultiSelect<
  T extends { universityIds: string[] },
  Y extends { name: string; id: string }
>({ form, universities, ...rest }: UniversityMultiSelectProps<T, Y>) {
  return (
    <>
      <MultiSelect
        data={universities.map((university) => ({
          label: university.name,
          value: university.id,
        }))}
        {...form.getInputProps("universityIds")}
        {...rest}
      />
    </>
  );
}
