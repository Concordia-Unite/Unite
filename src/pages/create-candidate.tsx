/**
 * create-candidate.tsx
 * Ian Kollipara
 * 2022.10.07
 *
 * Create Candidate Form Page
 */

import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useForm } from "@mantine/form";
import {
  AppShell,
  Button,
  createStyles,
  Group,
  Input,
  Stepper,
  Switch,
  Title,
} from "@mantine/core";
import type { NextPage } from "next";
import { useState } from "react";
import { IconAt, IconPhone } from "@tabler/icons";
import ReactInputMask from "react-input-mask";

const NUMBER_OF_STEPS = 1;

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

const CreateCandidate: NextPage = () => {
  const { data: session } = useSession({ required: true });
  const [active, setActive] = useState(0);
  const { classes } = useStyles();
  const addCandidate = trpc.candidate.insertOne.useMutation();
  const candidateForm = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: session?.user?.email || "",
      phoneNumber: "",
      isMarried: false,
      wasRostered: false,
      showAddress: false,
    },
  });
  const nextStep = () =>
    setActive((current) => (current < NUMBER_OF_STEPS ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <AppShell>
      <Title align="center">Add Yourself to Unite!</Title>
      <form
        className={classes.formPadding}
        onSubmit={candidateForm.onSubmit((values) =>
          addCandidate.mutateAsync({
            ...values,
            uid: session?.user?.id as string,
          })
        )}
      >
        <Stepper active={active} onStepClick={setActive} breakpoint="md">
          <Stepper.Step
            label="First Step"
            description="A little about Yourself"
          >
            <Input.Wrapper
              label="Your Email"
              description="Please enter the email you would like Calling bodies to contact you with."
              required
            >
              <Input
                type={"email"}
                icon={<IconAt />}
                {...candidateForm.getInputProps("email")}
              />
            </Input.Wrapper>
            <Input.Wrapper
              label="Your Name"
              description="Please enter in your name."
              required
            >
              <Group grow position="center">
                <Input
                  placeholder="First Name"
                  {...candidateForm.getInputProps("firstName")}
                />
                <Input
                  placeholder="Last Name"
                  {...candidateForm.getInputProps("lastName")}
                />
              </Group>
            </Input.Wrapper>
            <Input.Wrapper
              label="Your Phone Number"
              description="Enter a phone number for calling bodies to contact you. This is optional."
            >
              <Input
                icon={<IconPhone />}
                component={ReactInputMask}
                mask="(999) 999-9999"
                placeholder="Your Phone Number"
                {...candidateForm.getInputProps("phoneNumber")}
              />
            </Input.Wrapper>
            <Switch
              mt={"md"}
              label="Married"
              {...candidateForm.getInputProps("isMarried")}
            />
            <Switch
              mt={"md"}
              label="Rostered?"
              {...candidateForm.getInputProps("wasRostered")}
            />
          </Stepper.Step>
        </Stepper>
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Previous
          </Button>
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

export default CreateCandidate;
