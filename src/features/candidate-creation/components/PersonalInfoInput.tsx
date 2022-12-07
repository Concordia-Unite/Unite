import { createStyles, Switch, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props<T> {
  name?: string;
  form: UseFormReturnType<T>;
}

export function PersonalInfoInput<T extends CreationForm>(props: Props<T>) {
  return (
    <>
      <TextInput
        label="Your Name"
        {...props.form.getInputProps("name")}
        defaultValue={props.name}
        required
      />
      <Switch
        {...props.form.getInputProps("wasRostered")}
        label="Rostered?"
        description="Have you ever been on a district roster?"
      />
    </>
  );
}
