import Head from "next/head";
import { HomeLayout } from "@layouts/HomeLayout";
import { useStepper } from "../../hooks/useStepper";
import { useRouter } from "next/router";
import {
  CandidateCreationFormProvider,
  EmailInput,
  NameInput,
  RosterStatusInput,
  useCandidateCreationForm,
} from "@features/candidate/creation";
import { useSession } from "next-auth/react";
import { Button, Container, Group, Stepper, Title } from "@mantine/core";
import { AddressInput } from "@components/form/AddressInput";
import { trpc } from "../../utils/trpc";
import { notify } from "@lib/notification";
import { useId } from "@mantine/hooks";

export default function CandidateCreation() {
  const { data: session } = useSession({ required: true });
  const { activeStep, setActiveStep, prevStep, nextStep } = useStepper(2);
  const { data: districts } = trpc.district.getAll.useQuery();
  const { data: universities } = trpc.university.getAll.useQuery();
  const { mutateAsync: createCandidate } = trpc.candidate.create.useMutation();
  const id = useId();
  const router = useRouter();
  const form = useCandidateCreationForm({
    initialValues: {
      firstName: "",
      lastName: "",
      description: "",
      districtId: "",
      universityId: "",
      email: session?.user?.email ?? "",
      isRostered: false,
      address: {
        houseNumber: "",
        street: "",
        city: "",
        state: "NE",
        country: "",
        zipCode: "",
      },
    },
  });
  return (
    <>
      <Head>
        <title>Unite - Candidate Creation</title>
      </Head>
      <HomeLayout>
        <CandidateCreationFormProvider form={form}>
          <form
            onSubmit={form.onSubmit((values) =>
              notify(
                id,
                "Candidate Creation",
                {
                  onLoading: "Your Candidate is Being Created",
                  onFailure: "Something went wrong",
                  onSuccess: "Your Candidate was successfully created",
                },
                createCandidate({ ...values })
              ).then(() => router.push("/candidates/dashboard"))
            )}
          >
            <Container fluid>
              <Title align={"center"}>Candidate Creation</Title>
              <Stepper
                active={activeStep}
                onStepClick={setActiveStep}
                breakpoint={"md"}
              >
                <Stepper.Step
                  label={"Who are You?"}
                  description={"A Little bit about yourself"}
                >
                  <EmailInput
                    form={form}
                    description={
                      "This is shared with Calling Entities for them to reach out to you."
                    }
                  />
                  <NameInput
                    form={form}
                    description={
                      "This your full name. This is shared with Calling Entities during the Call Process."
                    }
                    label={"Your Full Name"}
                    required
                  />
                  <RosterStatusInput
                    universities={universities ?? []}
                    districts={districts ?? []}
                  />
                </Stepper.Step>
                <Stepper.Step
                  label={"Where are You?"}
                  description={"Your Address"}
                >
                  <AddressInput
                    form={form}
                    label={"Your Home Address"}
                    description={
                      "This is where you currently live. This is helpful for Calling Entities."
                    }
                    required
                  />
                  <Group position="center" mt={"md"}>
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={activeStep === 0}
                    >
                      Previous
                    </Button>
                    <Button variant="filled" type="submit">
                      Submit
                    </Button>
                  </Group>
                </Stepper.Step>
              </Stepper>
              {activeStep !== 1 && (
                <Group position="center" mt={"md"}>
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={activeStep === 0}
                  >
                    Previous
                  </Button>
                  <Button variant="filled" onClick={nextStep}>
                    Next
                  </Button>
                </Group>
              )}
            </Container>
          </form>
        </CandidateCreationFormProvider>
      </HomeLayout>
    </>
  );
}
