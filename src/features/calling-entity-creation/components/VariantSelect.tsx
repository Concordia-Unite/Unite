/**
 * VariantSelect.tsx
 * Ian Kollipara
 * 2022.12.10
 *
 * Variant Select Component
 */

// Imports
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";
import { Variant } from "@enums/variant";
import { Select } from "@mantine/core";

interface Props {
  form: UseFormReturnType<CreationForm>;
}

/**
 * ### VariantSelect
 * This form component is for entering the Calling Entity's variant or type.
 * It should be used with the provided creation form in this feature.
 */
export function VariantSelect(props: Props) {
  return (
    <>
      <Select
        label="Select the Type of Calling Entity"
        description="Each Calling Entity is a kind of body recognized by the LCMS, choose yours."
        required
        data={Object.values(Variant)}
        {...props.form.getInputProps("variant")}
      />
    </>
  );
}
