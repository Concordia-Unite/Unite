import { HousingAllowanceVariant } from "@enums/housing-allowance-variant";
import { createStyles, NativeSelect, NumberInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconCurrencyDollar } from "@tabler/icons";
import type { CreationForm } from "../lib/creation-form";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  form: UseFormReturnType<CreationForm>;
}

export function HousingAllowanceInput(props: Props) {
  return (
    <>
      <NativeSelect
        label="What kind of Housing Allowance?"
        data={Object.values(HousingAllowanceVariant)}
        required
        {...props.form.getInputProps("housingAllowance.type")}
      />
      {props.form.values.housingAllowance.type ===
        HousingAllowanceVariant.Stipend && (
        <NumberInput
          label="How much is the Stipend"
          icon={<IconCurrencyDollar />}
          min={0}
          precision={2}
          {...props.form.getInputProps("housingAllowance.stipend")}
        />
      )}
    </>
  );
}
