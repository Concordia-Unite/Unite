import { MultiSelect, MultiSelectProps } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface SubjectMultiSelectProps<T, Y>
  extends Omit<MultiSelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
  subjects: Y[];
}
export function SubjectMultiSelect<
  T extends { subjectIds: string[] },
  Y extends { name: string; id: string }
>({ form, subjects, ...rest }: SubjectMultiSelectProps<T, Y>) {
  return (
    <>
      <MultiSelect
        data={subjects.map((subject) => ({
          label: subject.name,
          value: subject.id,
        }))}
        {...form.getInputProps("subjectIds")}
        {...rest}
      />
    </>
  );
}
