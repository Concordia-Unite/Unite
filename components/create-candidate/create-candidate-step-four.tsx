/**
 * create-candidate-step-four.tsx
 * Ian Kollipara
 * 2022.10.06
 *
 * Create Candidate Step Four
 */

// Imports
import { Stepper, NativeSelect, Select, Switch } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CandidateRegistrationForm } from "@/lib/candidate-form";
import { DatePicker } from "@mantine/dates";
import { IconCalendarEvent, IconSchool } from "@tabler/icons";

type CreateCandidateFourthStepProps = {
  form: UseFormReturnType<CandidateRegistrationForm>;
  validSchools: { label: string; value: string }[];
};

const degreeTypes = ["B.S. Education", "B.A. Education", "B.S.", "B.A."];

export const CreateCandidateFourthStep = ({
  form,
  validSchools,
}: CreateCandidateFourthStepProps) => {
  return (
    <Stepper.Step label="Fourth Step" description="Your Education">
      Please just add Undergraduate Degree
      <NativeSelect
        label="Your Degree"
        data={degreeTypes}
        placeholder="Select One"
        {...form.getInputProps("educationDegree")}
      />
      <Switch
        label="Graduated?"
        {...form.getInputProps("educationIsGraduated")}
      />
      {form.values.educationIsGraduated && (
        <DatePicker
          icon={<IconCalendarEvent />}
          label="Graduation Date"
          description="Please select your graduation date"
          {...form.getInputProps("educationGraduationDate")}
        />
      )}
      <Select
        icon={<IconSchool />}
        label="Your Institution"
        description="Please select your Insititution"
        data={validSchools}
        {...form.getInputProps("educationAt")}
      />
    </Stepper.Step>
  );
};
