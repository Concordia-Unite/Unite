import { HealthCoverage } from "@enums/health-coverage";
import { HealthPlan } from "@enums/health-plan";
import { SocialSecurityContribution } from "@enums/social-security-contribution";
import { createStyles, NativeSelect, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import type { UseFormReturnType } from "@mantine/form";
import type { Position, University } from "@prisma/client";
import { IconCurrencyDollar } from "@tabler/icons";
import type { CreationForm } from "../lib/creation-form";
import { HousingAllowanceInput } from "./HousingAllowanceInput";
import { UniversityMultiSelect } from "./UniversityMultiSelect";

const useStyles = createStyles((theme) => ({
  //
}));

interface Props {
  form: UseFormReturnType<CreationForm>;
  universities: (University & {
    positions: Position[];
  })[];
}

export function AdvancedInput(props: Props) {
  return (
    <>
      <NumberInput
        min={0}
        icon={<IconCurrencyDollar />}
        label="Salary"
        description="What is the salary of the position?"
        required
        precision={2}
        {...props.form.getInputProps("salary")}
      />
      <NativeSelect
        label="Social Security Contribution"
        description="What is the Social Security Contribution of this position?"
        required
        data={Object.values(SocialSecurityContribution)}
        {...props.form.getInputProps("socialSecurityContribution")}
      />
      <NativeSelect
        label="Health Coverage"
        description="What is the health coverage provided by this position?"
        data={Object.values(HealthCoverage)}
        {...props.form.getInputProps("healthCoverage")}
      />
      <NativeSelect
        label="Health Plan"
        description="What is the health plan provided by this position?"
        data={Object.values(HealthPlan)}
        {...props.form.getInputProps("healthPlan")}
      />
      <HousingAllowanceInput form={props.form} />
      <DatePicker
        label="Starting Date"
        description="What is the starting date?"
        required
        {...props.form.getInputProps("startDate")}
      />
      <UniversityMultiSelect
        position={props.form.values.position}
        universities={props.universities}
        form={props.form}
      />
    </>
  );
}
