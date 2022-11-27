import Head from "next/head";
import { HomeLayout } from "@layouts/HomeLayout";
import {
  Button,
  Container,
  Group,
  Stepper,
  TextInput,
  Title,
} from "@mantine/core";
import {
  CallingEntityCreationFormProvider,
  useCallingEntityCreationForm,
  VariantSelect,
} from "@features/callingEntity/creation";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useStepper } from "../../hooks/useStepper";
import { DistrictSelect } from "@components/form/DistrictSelect";
import { AddressInput } from "@components/form/AddressInput";
import { notify } from "@lib/notification";
import { useId } from "@mantine/hooks";

export default function CallingEntityCreation() {
  const { data: districts } = trpc.district.getAll.useQuery();
  const { activeStep, setActiveStep, prevStep, nextStep } = useStepper(2);
  const { mutateAsync: createCallingEntity } =
    trpc.callingEntity.create.useMutation();
  const router = useRouter();
  const id = useId();
  const form = useCallingEntityCreationForm({
    initialValues: {
      name: "",
      variant: "Church",
      districtId: "",
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
        <title>Unite - Calling Entity Creation</title>
      </Head>
      <HomeLayout>
        <CallingEntityCreationFormProvider form={form}>
          <form
            onSubmit={form.onSubmit((values) =>
              notify(
                id,
                "Calling Entity Creation",
                {
                  onSuccess: "Calling Entity Successfully Created",
                  onFailure: "Something went wrong",
                  onLoading: "Calling Entity is being created",
                },
                createCallingEntity({ ...values })
              ).then(() => router.push("/calling-entity/dashboard"))
            )}
          >
            <Container fluid>
              <Title align={"center"}>Calling Entity Creation</Title>
              <Stepper
                active={activeStep}
                onStepClick={setActiveStep}
                breakpoint={"md"}
              >
                <Stepper.Step
                  label={"Who are You?"}
                  description={"A little bit about you"}
                >
                  <TextInput
                    label={"Your Entity's Name"}
                    description={
                      "Please input the name of the School/Church/RSO."
                    }
                    required
                    {...form.getInputProps("name")}
                  />
                  <VariantSelect
                    label={"What are You?"}
                    description={
                      "Select the kind of LCMS Recognized Body you are."
                    }
                    required
                    form={form}
                  />
                  <DistrictSelect
                    districts={districts ?? []}
                    label={"Select your District"}
                    description={
                      "Your Entity belongs to one of the LCMS Districts, select yours."
                    }
                    required
                    {...form.getInputProps("districtId")}
                  />
                </Stepper.Step>
                <Stepper.Step
                  label={"Where are You"}
                  description={"Your Entity's address"}
                >
                  <AddressInput
                    form={form}
                    label={"Your Address"}
                    required
                    description={
                      "Enter the address where your entity is. This is helpful for Candidates."
                    }
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
        </CallingEntityCreationFormProvider>
      </HomeLayout>
    </>
  );
}
