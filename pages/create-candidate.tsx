/*
 * create-candidate.tsx
 * Ian Kollipara
 * 2022-09-29
 *
 * Create Candidate Page
 */

// Imports
import type { NextPage, GetServerSideProps } from "next";
import { useState } from "react";
import {
  AppShell,
  Title,
  Stepper,
  Group,
  createStyles,
  Button,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Header from "@/components/header";
import { useSession } from "next-auth/react";
import client from "@/lib/prismadb";
import CreateCandidateStepOne from "@/components/create-candidate/create-candidate-step-one";
import { CandidateRegistrationForm } from "@/lib/candidate-form";
import CreateCandidateSecondStep from "@/components/create-candidate/create-candidate-step-two";
import CreateCandidateThirdStep from "@/components/create-candidate/create-candidate-step-three";
import { CreateCandidateFourthStep } from "@/components/create-candidate/create-candidate-step-four";
import { PreviousStepButton } from "@/components/create-candidate/previousStepButton";

const NUMBER_OF_STEPS = 4;

const useStyles = createStyles((theme) => ({
  formPadding: {
    paddingLeft: "0em",
    paddingRight: "0em",

    [`@media (max-width: ${theme.breakpoints.lg}px`]: {
      paddingLeft: "5em",
      paddingRight: "5em",
    },
  },
}));

const CreateCandidate: NextPage<{
  schools: { sid: string; name: string }[];
}> = ({ schools }) => {
  const { data } = useSession();
  const [active, setActive] = useState(0);

  const nextStep = () =>
    setActive((current) => (current < NUMBER_OF_STEPS ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { classes } = useStyles();

  const candidateForm = useForm<CandidateRegistrationForm>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: data?.user?.email || "",
      phoneNumber: "",
      isMarried: false,
      wasRostered: false,
      addressHouseNumber: "",
      addressStreet: "",
      addressState: "",
      addressZipCode: "",
      addressCountry: "United States",
      educationDegree: "",
      educationIsGraduated: false,
      educationGraduationDate: null,
      educationAt: (schools.length && schools[0].name) || "Unknown School",
    },
  });

  return (
    <AppShell header={<Header />}>
      <Title align="center" order={1}>
        Create your Candidate Profile
      </Title>
      <form
        className={classes.formPadding}
        onSubmit={candidateForm.onSubmit((value) =>
          fetch("/api/candidates", {
            method: "POST",
            body: JSON.stringify(value),
          })
        )}
      >
        <Stepper active={active} onStepClick={setActive} breakpoint="md">
          <CreateCandidateStepOne form={candidateForm} />
          <CreateCandidateSecondStep form={candidateForm} />
          <CreateCandidateThirdStep form={candidateForm} />
          <CreateCandidateFourthStep
            form={candidateForm}
            validSchools={schools.map((s) => {
              return { label: s.name, value: s.sid };
            })}
          />
        </Stepper>
        <Group position="center" mt="xl">
          <PreviousStepButton onClick={prevStep} />
          {active === NUMBER_OF_STEPS - 1 ? (
            <Button type="submit">Submit</Button>
          ) : (
            <Button onClick={nextStep}>Next</Button>
          )}
        </Group>
      </form>
    </AppShell>
  );
};

// Backend
export const getServerSideProps: GetServerSideProps = async () => {
  const schools = await client.school.findMany({
    select: {
      sid: true,
      name: true,
    },
  });

  return {
    props: {
      schools: schools,
    },
  };
};

export default CreateCandidate;
