import type { MultiSelectProps } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { MultiSelect } from "@mantine/core";

interface GradeMultiSelectProps<T, Y>
  extends Omit<MultiSelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
  grades: Y[];
}
export function GradeMultiSelect<
  T extends { gradeIds: string[] },
  Y extends { grade: string; id: string }
>({ form, grades, ...rest }: GradeMultiSelectProps<T, Y>) {
  return (
    <>
      <MultiSelect
        data={grades.map((grade) => ({ label: grade.grade, value: grade.id }))}
        {...form.getInputProps("gradeIds")}
        {...rest}
      />
    </>
  );
}
