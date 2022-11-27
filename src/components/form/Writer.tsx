import type { InputWrapperProps } from "@mantine/core";
import { Input } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import RichTextEditor from "@components/ui/RichTextEditor";

interface WriterProps<T> extends Omit<InputWrapperProps, "children"> {
  form: UseFormReturnType<T>;
}
export function Writer<T extends { description: string }>({
  form,
  ...rest
}: WriterProps<T>) {
  return (
    <>
      <Input.Wrapper {...rest}>
        <RichTextEditor
          style={{ height: "30vh" }}
          {...form.getInputProps("description")}
        />
      </Input.Wrapper>
    </>
  );
}
