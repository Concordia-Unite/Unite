/**
 * create-candidate-step-two.tsx
 * Ian Kollipara
 * 2022.10.05
 *
 * Create Candidate Step Two Component
 */

// Imports
import type { CandidateRegistrationForm } from "@/lib/candidate-form";
import { Stepper, Group, Input, Switch } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { IconPhone } from "@tabler/icons";
import InputMask from "react-input-mask";

type CreateCandidateSecondStepProps = {
  form: UseFormReturnType<CandidateRegistrationForm>;
};

export const CreateCandidateSecondStep = ({
  form,
}: CreateCandidateSecondStepProps) => {
  return (
    <Stepper.Step label="Second Step" description="Contact Information">
      <Input.Wrapper
        required
        label="Your Name"
        description="Please enter your first and last name."
      >
        <Group grow position="apart">
          <Input
            placeholder="First Name"
            {...form.getInputProps("firstName")}
          />
          <Input placeholder="Last Name" {...form.getInputProps("lastName")} />
        </Group>
      </Input.Wrapper>
      <Input.Wrapper
        label="Phone Number"
        description="Add your phone number for calling bodies to contact you. This information can be hidden."
      >
        <Input
          icon={<IconPhone />}
          component={InputMask}
          mask="+1 (999) 999-9999"
          placeholder="Your Phone Number"
          {...form.getInputProps("phoneNumber")}
        />
      </Input.Wrapper>
      <Switch label="Married" {...form.getInputProps("isMarried")} />
      <Switch label="Rostered?" {...form.getInputProps("wasRostered")} />
    </Stepper.Step>
  );
};

export default CreateCandidateSecondStep;
