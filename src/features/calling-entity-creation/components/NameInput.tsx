/**
 * NameInput.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Name Input Component
 */

// Imports
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";
import { TextInput } from "@mantine/core";

interface Props {
  form: UseFormReturnType<CreationForm>;
}

/**
 * ### NameInput
 * This form component is for entering the Calling Entity's name.
 * It should be used with the provided creation form in this feature.
 */
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
