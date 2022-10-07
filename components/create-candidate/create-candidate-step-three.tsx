/**
 * create-candidate-step-three.ts
 * Ian Kollipara
 * 2022.10.06
 *
 * Create Candidate Form Step Three
 */

// Imports
import { Stepper, Input } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { CandidateRegistrationForm } from "@/lib/candidate-form";
import { IconHome, IconRoad } from "@tabler/icons";
import InputMask from "react-input-mask";

type CreateCandidateThirdStepProps = {
  form: UseFormReturnType<CandidateRegistrationForm>;
};

export const CreateCandidateThirdStep = ({
  form,
}: CreateCandidateThirdStepProps) => {
  return (
    <Stepper.Step label="Third Step" description="Your Address">
      <Input.Wrapper label="House Number">
        <Input
          icon={<IconHome />}
          {...form.getInputProps("addressHouseNumber")}
        />
      </Input.Wrapper>
      <Input.Wrapper label="Street" description="Please enter your street">
        <Input icon={<IconRoad />} {...form.getInputProps("addressStreet")} />
      </Input.Wrapper>
      <Input.Wrapper label="Zip Code" description="Please enter your ZipCode">
        <Input
          placeholder="Zip Code"
          component={InputMask}
          mask="99999"
          {...form.getInputProps("addressZipCode")}
        />
      </Input.Wrapper>
    </Stepper.Step>
  );
};

export default CreateCandidateThirdStep;
