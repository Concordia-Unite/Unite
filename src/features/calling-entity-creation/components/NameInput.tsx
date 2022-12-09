import { createStyles, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  form: UseFormReturnType<CreationForm>;
}

export function NameInput(props: Props) {
  return (
    <>
      <TextInput
        label="Name of Calling Entity"
        required
        description="What is the name of your body?"
        {...props.form.getInputProps("name")}
      />
    </>
  );
}
