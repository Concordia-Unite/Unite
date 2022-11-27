import type { UseFormReturnType } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { IconAt } from "@tabler/icons";

interface EmailInputProps<T> {
  form: UseFormReturnType<T>;
  description?: string;
}
export function EmailInput<T extends { email: string }>({
  form,
  description,
}: EmailInputProps<T>) {
  return (
    <>
      <TextInput
        type={"email"}
        required
        label={"Your Email"}
        description={description}
        icon={<IconAt />}
        {...form.getInputProps("email")}
      />
    </>
  );
}
