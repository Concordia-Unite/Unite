/**
 * PersonalInfoInput.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Settings Update Input
 */

// Imports
import type { UseFormReturnType } from "@mantine/form";
import type { UpdateForm } from "../lib/update-form";
import { Switch, TextInput } from "@mantine/core";

interface Props<T> {
  name?: string;
  form: UseFormReturnType<T>;
}

export function PersonalInfoInput<T extends UpdateForm>(props: Props<T>) {
  return (
    <>
      <TextInput
        label="Your Name"
        {...props.form.getInputProps("name")}
        defaultValue={props.name}
      />
      <Switch
        {...props.form.getInputProps("wasRostered")}
        label="Rostered?"
        description="Have you ever been on a district roster?"
      />
    </>
  );
}
