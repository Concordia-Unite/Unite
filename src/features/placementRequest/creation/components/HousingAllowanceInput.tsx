import { Input, InputWrapperProps, NumberInput, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { HousingAllowanceType } from "@prisma/client";
import { IconCurrencyDollar } from "@tabler/icons";

interface HousingAllowanceInputProps<T>
  extends Omit<InputWrapperProps, "children"> {
  form: UseFormReturnType<T>;
}

export function HousingAllowanceInput<
  T extends {
    housingAllowance: { type: HousingAllowanceType; stipend?: number };
  }
>({ form, ...rest }: HousingAllowanceInputProps<T>) {
  return (
    <>
      <Input.Wrapper {...rest}>
        <Select
          data={Object.keys(HousingAllowanceType).map((housingAllowance) => ({
            label: housingAllowance.replaceAll("_", " "),
            value: housingAllowance,
          }))}
          {...form.getInputProps("housingAllowance.type")}
        />
        {form.values.housingAllowance.type === "Stipend" && (
          <NumberInput
            label={"Stipend Amount"}
            description={"How much is the Stipend?"}
            min={0}
            step={1000}
            icon={<IconCurrencyDollar />}
            {...form.getInputProps("housingAllowance.stipend")}
          />
        )}
      </Input.Wrapper>
    </>
  );
}
