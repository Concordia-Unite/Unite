/**
 * add-education.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Add Education Component
 */

import {
  Button,
  Input,
  Loader,
  NativeSelect,
  Select,
  Switch,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, UseFormReturnType } from "@mantine/form";
import type {
  Candidate,
  CandidateAddress,
  CandidateEducation as CandidateEducationType,
  School,
} from "@prisma/client";
import { useEffect } from "react";
import { trpc, trpcClient } from "../utils/trpc";
import { CandidateEducation } from "./candidate-education";

type AddEducationProps = {
  form: UseFormReturnType<
    Omit<
      Candidate & {
        attended: CandidateEducationType[];
        addresses: CandidateAddress[];
      },
      "uid" | "cid" | "wasRostered" | "isMarried"
    >
  >;
};

export const AddEducation = ({ form }: AddEducationProps) => {
  const educationForm = useForm<CandidateEducationType>({
    initialValues: {
      degree: "",
      isGraduated: false,
      graduationDate: null,
      schoolId: "",
      candidateId: "",
    },
  });

  const schools = trpc.school.getAll.useQuery({
    includeCandidates: false,
  });

  useEffect(() => {
    trpcClient.candidate.getCurrent.query({}).then((values) => {
      educationForm.setFieldValue("candidateId", values.cid);
    });
  }, []);

  const candidateEducation = trpc.candidate.getEducationFromCurrent.useQuery({
    includeSchools: true,
  });

  if (
    schools.isLoading ||
    !schools.data ||
    candidateEducation.isLoading ||
    !candidateEducation.data
  )
    return <Loader />;

  return (
    <>
      {candidateEducation.data.attended.map((a) => (
        <CandidateEducation education={a} />
      ))}
      <form
        onSubmit={educationForm.onSubmit((values) => {
          form.insertListItem("attended", educationForm.values);
          educationForm.reset();
        })}
      >
        <NativeSelect
          label="Your Degree"
          required
          data={["B.S. Education", "B.A. Education", "B.S.", "B.A."]}
          placeholder="Select One"
          {...educationForm.getInputProps("degree")}
        />
        <Select
          data={schools.data.map((s) => ({ label: s.name, value: s.sid }))}
          label="Select Your Institition"
          {...educationForm.getInputProps("schoolId")}
        />
        <Switch
          label="Graduated?"
          {...educationForm.getInputProps("isGraduated")}
        />
        {educationForm.values.isGraduated && (
          <DatePicker
            label="Select Graduation Date"
            placeholder="Select your date"
            {...educationForm.getInputProps("graduationDate")}
          />
        )}
        <Button
          variant="subtle"
          type="submit"
          disabled={!educationForm.isDirty()}
        >
          Add Education
        </Button>
      </form>
    </>
  );
};
