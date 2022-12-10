/**
 * PersonalInfoInput.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Candidate Personal Info Input
 */

// Imports
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";
import { Switch, TextInput } from "@mantine/core";

interface Props<T> {
  name?: string;
  form: UseFormReturnType<T>;
}

/**
 * ### PersonalInfoInput
 * This form component is used to get the personal info needed to create
 * a candidate in the database. This should be used in conjunction with
 * this feature's form.
 */
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
