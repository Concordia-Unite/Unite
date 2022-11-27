import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "server/trpc/router/_app";
import { createContextInner } from "server/trpc/context";
import superjson from "superjson";
import { trpc } from "../../../utils/trpc";
import Head from "next/head";
import { CallingEntityLayout } from "@layouts/CallingEntityLayout";
import {
  ClassroomSelect,
  GradeMultiSelect,
  HealthCoverageSelect,
  HealthPlanSelect,
  HousingAllowanceInput,
  MonthsOfServiceSelect,
  SalaryInput,
  SocialSecurityContributionSelect,
  SubjectMultiSelect,
  usePlacementRequestCreationForm,
} from "@features/placementRequest/creation";
import {
  Button,
  Container,
  Group,
  Select,
  Stepper,
  Switch,
  Title,
} from "@mantine/core";
import { useStepper } from "../../../hooks/useStepper";
import { PositionSelect } from "@components/form/PositionSelect";
import { Writer } from "@components/form/Writer";
import { DatePicker } from "@mantine/dates";
import { UniversityMultiSelect } from "@components/form/UniversityMultiSelect";
import { useEffect, useRef, useState } from "react";
import { useEventListener, useForceUpdate, useId } from "@mantine/hooks";
import { Position } from "@prisma/client";
import { notify } from "@lib/notification";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);
  if (!session)
    return {
      redirect: {
        destination: "/login",
        status: 401,
      },
      props: {},
    };

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: await createContextInner({
      session,
    }),
    transformer: superjson,
  });

  await ssg.callingEntity.getCurrent.prefetch();
  await ssg.subject.getAll.prefetch();
  await ssg.grade.getAll.prefetch();
  await ssg.university.getAll.prefetch();

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
}

export default function PlacementRequestCreate(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const form = usePlacementRequestCreationForm({
    initialValues: {
      position: "Lutheran_Teacher",
      gradeIds: [],
      subjectIds: [],
      classroom: "Departmentalized",
      description: "",
      startDate: new Date(),
      isTenured: false,
      isFullTime: false,
      salary: 0,
      socialSecurityContribution: "Worker_Pays_All",
      healthCoverage: undefined,
      healthPlan: undefined,
      universityIds: [],
      monthsOfService: undefined,
      housingAllowance: {
        type: "Salary",
        stipend: undefined,
      },
    },
  });
  const { activeStep, setActiveStep, prevStep, nextStep } = useStepper(3);
  const { data: subjects } = trpc.subject.getAll.useQuery();
  const { data: grades } = trpc.grade.getAll.useQuery();
  const { data: universities } = trpc.university.getAll.useQuery();
  const createId = useId();
  const { mutateAsync: createPlacementRequest } =
    trpc.callingEntity.createPlacementRequest.useMutation();

  // TODO: Figure out how to filter Universities

  return (
    <>
      <Head>
        <title>Unite - Placement Request Creation</title>
      </Head>
      <CallingEntityLayout>
        <Container fluid>
          <Title align={"center"}>Create A Placement Request</Title>
          <form
            onSubmit={form.onSubmit((values) =>
              notify(
                createId,
                "Placement Request Creation",
                {
                  onLoading: "Placement Request is being created.",
                  onFailure: "Something went wrong",
                  onSuccess: "Request successfully added",
                },
                createPlacementRequest({ ...values })
              )
            )}
          >
            <Stepper active={activeStep} onStepClick={setActiveStep}>
              <Stepper.Step
                label={"What is it?"}
                description={"Some important details"}
              >
                <PositionSelect
                  form={form}
                  searchable
                  label={"Position to Request"}
                  description={
                    "Select the position you want to place a request for."
                  }
                  required
                />
                <GradeMultiSelect
                  searchable
                  clearable
                  label={"Select the Grades associated with the request"}
                  description={
                    "These can be viewed as grades for schools, and ages for RSOs."
                  }
                  required
                  form={form}
                  grades={grades ?? []}
                />
                <SubjectMultiSelect
                  label={"Select the subjects for this Placement Request"}
                  description={
                    "Listed are all the subjects you can select. Choose the ones that pertain to this placement request."
                  }
                  required
                  form={form}
                  subjects={subjects ?? []}
                />
                <ClassroomSelect
                  label={"Select the kind of Classroom"}
                  description={
                    "This pertains to the kind of classroom, not the grade or position."
                  }
                  required
                  form={form}
                />
                <Writer
                  label={"Description of the Placement Request"}
                  description={
                    "Enter any important details for the Request that you would like candidates to know about."
                  }
                  form={form}
                />
              </Stepper.Step>
              <Stepper.Step
                label={"When is it?"}
                description={"Some technical and time details"}
              >
                <Group position={"center"}>
                  <Switch
                    label={"Is this Tenured?"}
                    required
                    {...form.getInputProps("isTenured")}
                  />
                  <Switch
                    label={"Is this Full Time?"}
                    required
                    {...form.getInputProps("isFullTime")}
                  />
                </Group>
                <DatePicker
                  label={"What is the Starting Date?"}
                  description={
                    "Select the current date if as soon as possible, but try to pick a reasonable starting date."
                  }
                  required
                  {...form.getInputProps("startDate")}
                />
                <MonthsOfServiceSelect
                  form={form}
                  searchable
                  required
                  label={"Select the Months of Service"}
                  description={"Select how long this call is"}
                />
              </Stepper.Step>
              <Stepper.Step
                label={"How much is it?"}
                description={"Financial Details"}
              >
                <SalaryInput
                  form={form}
                  label={"Starting Salary"}
                  required
                  step={1000}
                />
                <SocialSecurityContributionSelect
                  form={form}
                  label={"Social Security Contribution"}
                  searchable
                  required
                  description={
                    "How do you plan to aid in Social Security with this Placement?"
                  }
                />
                <HealthPlanSelect
                  searchable
                  form={form}
                  label={"Select the Health Plan for this Placement"}
                />
                <HealthCoverageSelect
                  searchable
                  form={form}
                  label={"Select the Health Coverage Available"}
                />
                <HousingAllowanceInput
                  form={form}
                  label={"Housing Allowance"}
                  description={
                    "How much do you want to aid the candidate in finding housing?"
                  }
                  required
                />
              </Stepper.Step>
              <Stepper.Step
                label={"Who to send it to?"}
                description={"What universities to let know"}
              >
                <UniversityMultiSelect
                  label={"Select the Universities to send this placement to"}
                  description={
                    "There are quite a few CUS Schools who have graduates who could fill your role. Choose the Universities to send a request to."
                  }
                  required
                  form={form}
                  universities={universities ?? []}
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
            {activeStep !== 3 && (
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
          </form>
        </Container>
      </CallingEntityLayout>
    </>
  );
}
