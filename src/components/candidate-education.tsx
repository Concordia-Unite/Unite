/**
 * candidate-education.tsx
 * Ian Kollipara
 * 2022.10.08
 *
 * Candidate Education
 */

import { Group, Stack, Text } from "@mantine/core";
import type {
  CandidateEducation as CandidateEducationType,
  School,
} from "@prisma/client";
import { IconSchool } from "@tabler/icons";
import { Address } from "./address";

type CandidateEducationProps = {
  education: CandidateEducationType & { at: School };
};

export const CandidateEducation = ({ education }: CandidateEducationProps) => (
  <Stack>
    <Group>
      <IconSchool />
      <Stack justify={"center"} spacing={0}>
        <Text>{education.at.name}</Text>
        <Text color={"dimmed"}>{education.degree}</Text>
      </Stack>
    </Group>
    <Address {...education.at} />
  </Stack>
);
