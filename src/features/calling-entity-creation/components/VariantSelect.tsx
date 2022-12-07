import { Variant } from "@enums/variant";
import { createStyles, Select } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  form: UseFormReturnType<CreationForm>;
}

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
