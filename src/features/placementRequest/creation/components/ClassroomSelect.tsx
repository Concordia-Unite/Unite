import { UseFormReturnType } from "@mantine/form";
import { Classroom } from "@prisma/client";
import { Select, SelectProps } from "@mantine/core";

interface ClassroomSelectProps<T> extends Omit<SelectProps, "data" | "form"> {
  form: UseFormReturnType<T>;
}
export function ClassroomSelect<T extends { classroom: Classroom }>({
  form,
  ...rest
}: ClassroomSelectProps<T>) {
  return (
    <>
      <Select
        data={Object.keys(Classroom).map((classroom) => ({
          label: classroom.replaceAll("_", " "),
          value: classroom,
        }))}
        {...rest}
        {...form.getInputProps("classroom")}
      />
    </>
  );
}
