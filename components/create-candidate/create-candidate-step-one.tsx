/**
 * create-candidate-step-one.tsx
 * Ian Kollipara
 * 2022.10.05
 *
 * The first step in creating a candidate
 */

// Imports
import type { CandidateRegistrationForm } from "@/lib/candidate-form";
import { Stepper, Input } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconAt } from "@tabler/icons";

type CreateCandidateStepOneProps = {
  form: UseFormReturnType<CandidateRegistrationForm>;
};

export const CreateCandidateStepOne = ({
  form,
}: CreateCandidateStepOneProps) => {
  return (
    <Stepper.Step label="First Step" description="Add your Email">
      <Input
        type={"email"}
        icon={<IconAt />}
        {...form.getInputProps("email")}
      />
    </Stepper.Step>
  );
};

export default CreateCandidateStepOne;
